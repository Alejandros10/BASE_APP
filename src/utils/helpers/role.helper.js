import { GLOBALS } from '../Globals'

export function getAvailableRoles(userLogged) {
    
    if (userLogged.role === GLOBALS.roles.admin.id) {
        return [GLOBALS.roles.admin, GLOBALS.roles.user]
    }

    if (userLogged.role === GLOBALS.roles.user.id) {
        return [GLOBALS.roles.user]
    }

    return [GLOBALS.roles.user]
}

export function getRole(id) {
    const index = Object.keys(GLOBALS.roles).find((key) => GLOBALS.roles[key].id === id)

    if (index) {
        return GLOBALS.roles[index]
    }
}