import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  AddressDTO,
  CreateResidenceDTO,
  EditResidenceDTO,
} from './dto/residence.dto';
import { CareTaker, Resident } from '@prisma/client';

@Injectable()
export class ResidenceService {
  constructor(private prismaService: PrismaService) {}

  async create(payload: CreateResidenceDTO) {
    try {
      const {
        street,
        streetNumber,
        city,
        name,
        neighborhood,
        state,
        zipCode,
        careTakers,
        complement,
        residents,
      } = payload;

      let residenceResidents: Resident[];
      let residenceCareTakers: CareTaker[];

      const transaction = await this.prismaService.$transaction(
        async (prisma) => {
          const addressPayload = {
            street,
            streetNumber,
            city,
            neighborhood,
            state,
            zipCode,
            complement,
          };

          if (residents) {
            residenceResidents = await Promise.all(
              residents?.map((residentId) =>
                prisma.resident.findUnique({ where: { id: residentId } }),
              ),
            );
          }

          if (careTakers) {
            residenceCareTakers = await Promise.all(
              careTakers?.map((careTakerId) =>
                prisma.careTaker.findUnique({ where: { id: careTakerId } }),
              ),
            );
          }

          const residence = await this.prismaService.residence.create({
            data: {
              name,
              address: {
                create: addressPayload,
              },
              careTakers: {
                connect: residenceCareTakers?.map((careTaker) => ({
                  id: careTaker.id,
                })),
              },
              residents: {
                connect: residenceResidents?.map((resident) => ({
                  id: resident.id,
                })),
              },
            },
          });

          return residence;
        },
      );

      return transaction;
    } catch (error) {
      console.log('Error creating new Residence', error);
      throw error;
    }
  }

  async update(payload: EditResidenceDTO) {
    try {
      const {
        addressId,
        city,
        complement,
        careTakers,
        name,
        neighborhood,
        residents,
        state,
        street,
        streetNumber,
        zipCode,
        residenceId,
      } = payload;
      let residenceResidents: Resident[];
      let residenceCareTakers: CareTaker[];
      const transaction = await this.prismaService.$transaction(
        async (prisma) => {
          if (addressId) {
            const addressPayload = {
              street,
              streetNumber,
              city,
              name,
              neighborhood,
              state,
              zipCode,
              complement,
            };
            await prisma.address.update({
              where: { id: addressId },
              data: addressPayload,
            });
          }

          if (careTakers) {
            residenceCareTakers = await Promise.all(
              careTakers?.map((careTakerId) =>
                prisma.careTaker.findUnique({ where: { id: careTakerId } }),
              ),
            );
          }

          if (residents) {
            residenceResidents = await Promise.all(
              residents?.map((residentId) =>
                prisma.resident.findUnique({ where: { id: residentId } }),
              ),
            );
          }

          const updatedResidence = await prisma.residence.update({
            where: { id: residenceId },
            data: {
              careTakers: {
                connect: residenceCareTakers?.map((careTaker) => ({
                  id: careTaker.id,
                })),
              },
              residents: {
                connect: residenceResidents?.map((resident) => ({
                  id: resident.id,
                })),
              },
              name,
            },
          });

          return updatedResidence;
        },
      );
      return transaction;
    } catch (error) {
      console.log('Error updating Residence', error);
      throw error;
    }
  }

  async getAll() {
    return await this.prismaService.residence.findMany({
      include: { address: true, careTakers: true, residents: true },
    });
  }

  async deleteResidence(id: string) {
    try {
      await this.prismaService.residence.delete({ where: { id: id } });
    } catch (error) {
      throw error;
    }
  }

  async deleteAddress(id: number) {
    try {
      await this.prismaService.address.delete({ where: { id: id } });
    } catch (error) {
      throw error;
    }
  }

  async updateAddress(payload: AddressDTO) {
    try {
      const dataPayload = { ...payload };
      delete dataPayload.addressId;
      await this.prismaService.address.update({
        where: {
          id: payload.addressId,
        },
        data: dataPayload,
      });
    } catch (error) {
      throw error;
    }
  }
}
