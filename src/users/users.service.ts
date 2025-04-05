import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { RegisterDto, LoginDto, VerifyDto } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { MailService } from 'src/mail/mail.service';
import { totp } from 'otplib';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersModule } from './users.module';

totp.options = { step: 120 };

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private mailer: MailService,
  ) {}
  async register(data: RegisterDto) {
    let checkUser = await this.prisma.users.findFirst({
      where: { email: data.email },
    });

    if (checkUser) {
      let otp = totp.generate('secret' + data.email);

      let sendOtp = await this.mailer.sendMail(
        data.email,
        'New Otp',
        `new Otp:  ${otp}`,
      );
      return { message: 'New OTP', otp };
    }
    let hashPass = bcrypt.hashSync(data.password, 7);

    data.password = hashPass;

    let otp = totp.generate('secret' + data.email);

    let sendOtp = await this.mailer.sendMail(
      data.email,
      'New Otp',
      `new Otp:  ${otp}`,
    );

    if (data.role) {
      data.role = 'USER';
    }
    await this.prisma.users.create({ data });

    return {
      message: 'Register Successfully, OTP sent, please activate your account',
      otp,
    };
  }

  async login(data: LoginDto) {
    let checkUser = await this.prisma.users.findFirst({
      where: { email: data.email },
    });

    if (!checkUser) {
      throw new NotFoundException('User Not Found');
    }

    if (checkUser.status !== 'ACTIVE') {
      throw new BadRequestException('Plase Activate your acount');
    }

    let chechPass = bcrypt.compareSync(data.password, checkUser.password);

    if (!chechPass) {
      throw new NotFoundException('Wrong Password');
    }

    let token = await this.jwtService.sign({
      id: checkUser.id,
      name: checkUser.fullName,
      role: checkUser.role,
      status: checkUser.status,
    });

    return {
      token,
    };
  }

  async findAll() {
    let all = await this.prisma.users.findMany();
    return { data: all };
  }

  async findOne(id: string) {
    let OneCateg = await this.prisma.users.findFirst({
      where: { id: Number(id) },
    });

    if (!OneCateg) {
      throw new NotFoundException('Users Not Found');
    }

    return { data: OneCateg };
  }

  async Update(id: number, data: UpdateUserDto, req: Request) {
    return {
      message: 'Changes saved successfully',
      data: await this.prisma.users.updateMany({ data, where: { id } }),
    };
  }

  async remove(id: string, req: Request) {
    if (req['user'].id != id && req['user'].role != 'ADMIN') {
      throw new BadRequestException(
        'You cannot send your information to someone else.',
      );
    }

    let OneCateg = await this.prisma.users.findFirst({
      where: { id: Number(id) },
    });

    if (!OneCateg) {
      throw new NotFoundException('Users Not Found');
    }

    let del = await this.prisma.users.delete({ where: { id: Number(id) } });

    return { data: del };
  }

  async verify(data: VerifyDto) {
    let secret = 'secret' + data.email;

    let checkuser = await this.prisma.users.findFirst({
      where: { email: data.email },
    });
    let verifyOtp = totp.verify({ token: data.otp, secret });

    if (!checkuser) {
      throw new NotFoundException('User Not Found');
    }
    if (!verifyOtp) {
      throw new BadRequestException('Invalid Otp');
    }

    let UpdateUser = await this.prisma.users.update({
      where: { email: data.email },
      data: { status: 'ACTIVE' },
    });

    return { message: 'Your account has been activated.' };
  }

  generateRefreshToken(payload: any) {
    return this.jwtService.sign(payload, {
      secret: 'refresh_key',
      expiresIn: '59s', // 7 kun
    });
  }

  async GetMe(req: Request) {
    return {
      data: await this.prisma.users.findMany({
        where: { id: req['user'].id },
        include: {
          likes: true,
          comment: true,
          order: true,
          banner: true,
          view: true,
        },
      }),
    };
  }
}
