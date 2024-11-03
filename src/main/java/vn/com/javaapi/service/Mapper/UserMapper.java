package vn.com.javaapi.service.Mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.NullValuePropertyMappingStrategy;
import vn.com.javaapi.dto.UserDTO;
import vn.com.javaapi.entity.Users;

import java.util.List;

@Mapper(componentModel = "spring", nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface UserMapper {

    @Mapping(target = "userId", source = "users.id")
    @Mapping(target = "username", source = "users.username")
    @Mapping(target = "name", source = "users.name")
    @Mapping(target = "email", source = "users.email")
    @Mapping(target = "password", source = "users.password")
    @Mapping(target = "phone", source = "users.phone")
    @Mapping(target = "address", source = "users.address")
    @Mapping(target = "roleId", source = "users.roleId")
    @Mapping(target = "birthday", source = "users.birthday")
    @Mapping(target = "createdAt", source = "users.createdAt")
    @Mapping(target = "updatedAt", source = "users.updatedAt")
    UserDTO toDTO(Users users);

    List<UserDTO> toDTOUser(List<Users> users);

    Users toEntityUsers(UserDTO userDTO);
}
