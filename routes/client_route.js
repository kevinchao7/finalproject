module.exports = (app,db) =>{
  // Read client data
  app.get('/api/client/',(req,res)=>{
    if (req.user && req.isAuthenticated()){
      db.clients.findOne({ where : {id : req.user }}).then( (dbResp)=>{ res.json(dbResp) } );
    }else{
      res.json({message : 'You are not logged in'});
    }
  });
  // Modify Settings
  app.put('/api/client',(req,res)=>{
    console.log('Update client: ' + JSON.stringify(req.body,null,4));
    db.clients.update(
      {
        monthly_income : req.body.income,
        job_title : req.body.job,
        phone_number : req.body.cell,
        current_savings : req.body.saving
      },
      {
        where:{ google_id :req.body.id }
      }).then((resp)=>{ res.redirect('/profile/') });
  });

  app.get('/logout/',(req,res)=>{
    if(req.user && req.isAuthenticated()){
      req.logout();
    }
    res.redirect('/');
  })
  // app.post("/api/client",(req,res)=>{
  //   db.clients.create({
  //     client_name : req.body.name
  //   }).then((resp)=>{
  //     res.redirect('/');
  //   }).catch((err)=>{
  //     console.log('Error Message: ' + err.errors[0].message);
  //     res.status(400).redirect('/');
  //   });
  // });
}
