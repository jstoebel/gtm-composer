export const getAccounts = (client) => {
  return async (dispatch) => {
    const result = await client.accounts.list()
    addAccounts(result.data.account)
  }
}