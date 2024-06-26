import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from './entities/role.entity';
import { v4 as uuidv4 } from 'uuid';


@Injectable()
export class RoleService {

  constructor(
    @InjectRepository(Role)
    private permissionsRepository: Repository<Role>,
  ) { }

  create(createRoleDto: CreateRoleDto, createdBy: string): Promise<Role> {
    const { name, description } = createRoleDto;

    const newRole = new Role();
    newRole.id = uuidv4(); // Gerar UUID aleatório
    newRole.name = name;
    newRole.description = description;
    newRole.createdBy = createdBy;
    newRole.updatedBy = createdBy;
    return this.permissionsRepository.save(newRole);
  }

  findAll(): Promise<Role[]> {
    return this.permissionsRepository.find();
  }

  findOne(id: string): Promise<Role> {
    return this.permissionsRepository.findOne({ where: { id } });
  }

  async update(id: string, updateRoleDto: UpdateRoleDto, updatedBy: string): Promise<Role> {
    await this.permissionsRepository.update(id, { ...updateRoleDto, updatedBy });
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.permissionsRepository.delete(id);
  }
}