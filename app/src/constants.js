module.exports = {
   Headers : {
      'Accept': 'application/json', 
      'Content-Type': 'application/json', 
      'BX-TOKEN': process.env.BX_TOKEN, 
      'BX-USERCODE': process.env.BX_USERCODE, 
      'BX-CLIENT_ACCOUNT': process.env.BX_CLIENT_ACCOUNT
   },
   Cities : [
      { id_city : 1, name : 'Ciudad 1'},
      { id_city : 2, name : 'Ciudad 2 '},
      { id_city : 3, name : 'Ciudad 3'},
      { id_city : 4, name : 'Ciudad 4'}
   ]
} 