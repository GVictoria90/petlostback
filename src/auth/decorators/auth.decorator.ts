// Importa los decoradores y funciones necesarios desde el módulo @nestjs/common.
import { UseGuards, applyDecorators } from '@nestjs/common';

// Importa el enumerador Role que define los roles de usuario.
import { Role } from '../../common/enums/role.enum';

// Importa el decorador personalizado Roles.
import { Roles } from './roles.decorator';

// Importa el guardia de autenticación AuthGuard.
import { AuthGuard } from '../guard/auth.guard';

// Importa el guardia de roles RolesGuard.
import { RolesGuard } from '../guard/roles.guard';

/**
 * La función Auth es un decorador personalizado que combina la verificación de roles y la autenticación.
 * @ param role - El rol de usuario que se necesita para acceder al recurso.
 * @ returns Un decorador que aplica los decoradores Roles y UseGuards.
 */
export function Auth(role: Role) {
    // Retorna la aplicación de múltiples decoradores a la vez.
    return applyDecorators(
        // Aplica el decorador de roles con el rol especificado.
        Roles(role), 
        
        // Aplica los guardias de autenticación y de roles.
        UseGuards(AuthGuard, RolesGuard)
    );
} 
