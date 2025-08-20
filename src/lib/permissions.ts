import { createAccessControl } from 'better-auth/plugins/access'
import { defaultStatements, adminAc } from 'better-auth/plugins/admin/access'

const statements = {
  ...defaultStatements,
  employees: ['create', 'read', 'update', 'delete', 'update:own', 'delete:own']
} as const

export const ac = createAccessControl(statements)

export const roles = {
  member: ac.newRole({
    employees: ['create', 'read', 'update:own']
  }),
  owner: ac.newRole({
    employees: ['create', 'read', 'update:own']
  }),

  admin: ac.newRole({
    employees: [
      'create',
      'read',
      'update',
      // 'delete',
      'update:own'
      // 'delete:own'
    ],
    ...adminAc.statements
  })
}
