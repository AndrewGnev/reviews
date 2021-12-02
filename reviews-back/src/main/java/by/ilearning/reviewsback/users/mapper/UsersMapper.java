package by.ilearning.reviewsback.users.mapper;

import by.ilearning.reviewsback.users.api.dto.UserDto;
import by.ilearning.reviewsback.users.impl.entity.User;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface UsersMapper {

    UsersMapper INSTANCE = Mappers.getMapper(UsersMapper.class);

    UserDto userToUserDto(User user);
}
