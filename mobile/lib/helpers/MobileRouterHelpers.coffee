@MobileRouteHelpers = {
  showNewModelInstanceForm: (modelDefId) ->
    Router.go '/mobile/models/' + modelDefId + '/' + Form_Mode_New
    return

  showModelInstanceList: (modelId) ->
    Router.go '/mobile/models/' + modelId + '/'
    return

  showModelDetails: (modelId, itemId) ->
    Router.go '/mobile/models/' + modelId + '/details/' + itemId
    return

  showEditModelInstanceForm: (modelDefId) ->
    Router.go '/mobile/models/' + modelDefId + '/' + Form_Mode_Edit
    return

}