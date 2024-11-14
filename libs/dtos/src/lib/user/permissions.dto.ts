import { USER_ROLES } from '@utils'

import { Expose, Transform } from 'class-transformer'


export class Permissions {
  [x: string]: any

  @Expose()
  @Transform(() => false)
  canAddClient: boolean


  @Expose()
  @Transform(() => false)
  canViewClientList: boolean


  @Expose()
  @Transform(() => false)
  viewClusterList: boolean


  @Expose()
  @Transform(() => false)
  viewClusterTickets: boolean


  @Expose()
  @Transform(() => false)
  viewClusterClients: boolean


  
  @Expose()
  @Transform(() => false)
  viewAccountsList: boolean


  @Expose()
  @Transform(() => false)
  canAddClientCommand: boolean


  @Expose()
  @Transform(() => false)
  canAddAccountBotCommand: boolean


  @Expose()
  @Transform(() => false)
  canAssignToAgent: boolean


  @Expose()
  @Transform(() => false)
  viewAccountBotList: boolean


  @Expose()
  @Transform(() => false)
  viewBotSetList: boolean


  @Expose()
  @Transform(() => false)
  viewBotEventList: boolean

  @Expose()
  @Transform(() => false)
  viewBotRequestsList: boolean

  @Expose()
  @Transform(() => false)
  viewBrokersList: boolean

  @Expose()
  @Transform(() => false)
  viewFxServersList: boolean

  @Expose()
  @Transform(() => false)
  viewEconomicNewsList: boolean

  @Expose()
  @Transform(() => false)
  viewPlainingTasksList: boolean

  @Expose()
  @Transform(() => false)
  viewObjectCommentsList: boolean

  @Expose()
  @Transform(() => false)

  viewAccountDateReportsList: boolean

  @Expose()
  @Transform(() => false)

  viewAgentList: boolean

  @Expose()
@Transform(() => false)

  canChangeClientServer: boolean


  @Expose()
  @Transform(() => true)
  viewHelp: boolean


  @Expose()
  @Transform(() => false)

  canSyncClusterClient: boolean


  @Expose()
  @Transform(() => false)

  canTrackingReportClusterClient: boolean

  @Expose()
  @Transform(() => false)
  viewUserLog: boolean


  @Expose()
  @Transform(() => false)
  viewLisence : boolean


  
  @Expose()
  @Transform(() => false)
  viewAccountLisence: boolean


  @Expose()
  @Transform(() => false)
  viewAccountUser: boolean


  @Expose()
  @Transform(() => false)
  viewAffiliate: boolean


}
