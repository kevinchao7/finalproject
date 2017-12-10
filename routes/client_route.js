module.exports = (app,db) =>{
  // Read client data
  app.get('/api/client/',(req,res)=>{
    // if (req.user && req.isAuthenticated()){
      db.clients.findOne({ where : {id : 2 }}).then( (dbResp)=>{ res.json(dbResp) } ).catch((err)=>{
        console.log(err);
        res.status(500).end();
      });
    // }else{
    //   res.json({message : 'You are not logged in'});
    // }
  });
  // Modify Settings
  app.put('/api/client',(req,res)=>{
    console.log('Update client: ' + JSON.stringify(req.body,null,4));
    db.clients.update(
      {
        client_name: req.body.client_name,
        monthly_income : req.body.monthly_income,
        job_title : req.body.job_title,
        current_savings : req.body.current_savings
      },
      {
        where:{ google_id :req.body.id }
      }).then((resp)=>{ res.redirect('/profile/') }).catch((err)=>{
        console.log(err);
        res.status(500).end();
      });
  });

  // app.get('/logout/',(req,res)=>{
  //   if(req.user && req.isAuthenticated()){
  //     req.logout();
  //   }
  //   res.redirect('/');
  // })
  app.post("/api/client",(req,res)=>{
    db.clients.update(
      {
        client_name: req.body.client_name,
        monthly_income : req.body.monthly_income,
        job_title : req.body.job_title,
        current_savings : req.body.current_savings
      },
      {
        where:{ id :req.body.id }
      }).then((resp)=>{ res.redirect('/profile/') }).catch((err)=>{
        console.log(err);
        res.status(500).end();
      });
  });
}
