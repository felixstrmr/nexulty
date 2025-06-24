import { Database } from '@/types/supabase'
import { createClient } from '@supabase/supabase-js'
import { schemaTask } from '@trigger.dev/sdk/v3'
import { randomUUID } from 'crypto'
import { z } from 'zod'

const supabase = createClient<Database>(
  process.env.SUPABASE_URL as string,
  process.env.SUPABASE_SERVICE_ROLE_SECRET as string,
)

export const setupOrganizationTask = schemaTask({
  id: 'setup-organization-task',
  schema: z.object({
    organizationId: z.string(),
  }),
  run: async (payload) => {
    const { organizationId } = payload

    const serviceRequestId = randomUUID()
    const changeRequestId = randomUUID()
    const incidentRequestId = randomUUID()
    const problemRequestId = randomUUID()

    const hardwareGroupId = randomUUID()
    const softwareGroupId = randomUUID()
    const networkGroupId = randomUUID()
    const accessGroupId = randomUUID()
    const facilitiesGroupId = randomUUID()

    const defaultTicketTypes = [
      {
        id: serviceRequestId,
        name: 'Service Request',
        organization: organizationId,
      },
      {
        id: changeRequestId,
        name: 'Change Request',
        organization: organizationId,
      },
      {
        id: incidentRequestId,
        name: 'Incident',
        organization: organizationId,
      },
      {
        id: problemRequestId,
        name: 'Problem',
        organization: organizationId,
      },
    ]

    const defaultTicketStatuses = [
      {
        name: 'Open',
        type: 'open' as const,
        organization: organizationId,
      },
      {
        name: 'In Progress',
        type: 'open' as const,
        organization: organizationId,
      },
      {
        name: 'Pending',
        type: 'open' as const,
        organization: organizationId,
      },
      {
        name: 'On Hold',
        type: 'open' as const,
        organization: organizationId,
      },
      {
        name: 'Resolved',
        type: 'closed' as const,
        organization: organizationId,
      },
      {
        name: 'Closed',
        type: 'closed' as const,
        organization: organizationId,
      },
      {
        name: 'Cancelled',
        type: 'closed' as const,
        organization: organizationId,
      },
    ]

    const defaultTicketCategoryGroups = [
      {
        id: hardwareGroupId,
        name: 'Hardware',
        organization: organizationId,
      },
      {
        id: softwareGroupId,
        name: 'Software',
        organization: organizationId,
      },
      {
        id: networkGroupId,
        name: 'Network & Connectivity',
        organization: organizationId,
      },
      {
        id: accessGroupId,
        name: 'Access & Security',
        organization: organizationId,
      },
      {
        id: facilitiesGroupId,
        name: 'Facilities & Environment',
        organization: organizationId,
      },
    ]

    const defaultTicketCategories = [
      {
        name: 'Desktop Computer',
        type: serviceRequestId,
        group: hardwareGroupId,
        organization: organizationId,
      },
      {
        name: 'Laptop',
        type: serviceRequestId,
        group: hardwareGroupId,
        organization: organizationId,
      },
      {
        name: 'Monitor',
        type: serviceRequestId,
        group: hardwareGroupId,
        organization: organizationId,
      },
      {
        name: 'Printer',
        type: incidentRequestId,
        group: hardwareGroupId,
        organization: organizationId,
      },
      {
        name: 'Mobile Device',
        type: serviceRequestId,
        group: hardwareGroupId,
        organization: organizationId,
      },
      {
        name: 'Server Hardware',
        type: incidentRequestId,
        group: hardwareGroupId,
        organization: organizationId,
      },
      {
        name: 'Operating System',
        type: incidentRequestId,
        group: softwareGroupId,
        organization: organizationId,
      },
      {
        name: 'Microsoft Office',
        type: serviceRequestId,
        group: softwareGroupId,
        organization: organizationId,
      },
      {
        name: 'Business Application',
        type: serviceRequestId,
        group: softwareGroupId,
        organization: organizationId,
      },
      {
        name: 'Antivirus Software',
        type: incidentRequestId,
        group: softwareGroupId,
        organization: organizationId,
      },
      {
        name: 'Software Installation',
        type: serviceRequestId,
        group: softwareGroupId,
        organization: organizationId,
      },
      {
        name: 'Software License',
        type: serviceRequestId,
        group: softwareGroupId,
        organization: organizationId,
      },
      {
        name: 'Internet Connection',
        type: incidentRequestId,
        group: networkGroupId,
        organization: organizationId,
      },
      {
        name: 'WiFi Access',
        type: incidentRequestId,
        group: networkGroupId,
        organization: organizationId,
      },
      {
        name: 'VPN Access',
        type: serviceRequestId,
        group: networkGroupId,
        organization: organizationId,
      },
      {
        name: 'Network Drive',
        type: serviceRequestId,
        group: networkGroupId,
        organization: organizationId,
      },
      {
        name: 'Email Issues',
        type: incidentRequestId,
        group: networkGroupId,
        organization: organizationId,
      },
      {
        name: 'Network Equipment',
        type: incidentRequestId,
        group: networkGroupId,
        organization: organizationId,
      },
      {
        name: 'Account Creation',
        type: serviceRequestId,
        group: accessGroupId,
        organization: organizationId,
      },
      {
        name: 'Password Reset',
        type: serviceRequestId,
        group: accessGroupId,
        organization: organizationId,
      },
      {
        name: 'Access Rights',
        type: serviceRequestId,
        group: accessGroupId,
        organization: organizationId,
      },
      {
        name: 'Security Incident',
        type: incidentRequestId,
        group: accessGroupId,
        organization: organizationId,
      },
      {
        name: 'Two-Factor Authentication',
        type: serviceRequestId,
        group: accessGroupId,
        organization: organizationId,
      },
      {
        name: 'Data Backup',
        type: serviceRequestId,
        group: accessGroupId,
        organization: organizationId,
      },
      {
        name: 'Office Equipment',
        type: serviceRequestId,
        group: facilitiesGroupId,
        organization: organizationId,
      },
      {
        name: 'Workspace Setup',
        type: serviceRequestId,
        group: facilitiesGroupId,
        organization: organizationId,
      },
      {
        name: 'Power & UPS',
        type: incidentRequestId,
        group: facilitiesGroupId,
        organization: organizationId,
      },
      {
        name: 'HVAC Issues',
        type: incidentRequestId,
        group: facilitiesGroupId,
        organization: organizationId,
      },
      {
        name: 'Physical Security',
        type: incidentRequestId,
        group: facilitiesGroupId,
        organization: organizationId,
      },
    ]

    await Promise.all([
      supabase.from('ticket_types').insert(defaultTicketTypes).throwOnError(),
      supabase
        .from('ticket_statuses')
        .insert(defaultTicketStatuses)
        .throwOnError(),
      supabase
        .from('ticket_category_groups')
        .insert(defaultTicketCategoryGroups)
        .throwOnError(),
      supabase
        .from('ticket_categories')
        .insert(defaultTicketCategories)
        .throwOnError(),
    ])
  },
})
