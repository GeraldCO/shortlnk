import { Meteor } from 'meteor/meteor';
import { WebApp } from 'meteor/webapp';
import moment from 'moment';


import '../imports/api/users';
import { links } from '../imports/api/links';
import '../imports/startup/simple-schema-configuration';


Meteor.startup(() => {
  // code to run on server at startup

  WebApp.connectHandlers.use((req, res, next)=>{
    const _id = req.url.slice(1);
    const link = links.findOne( { _id } );
    
    if( link ){
      res.statusCode = 302;
      res.setHeader('Location', link.url);
      res.end();
      Meteor.call('links.trackVisit', _id); 
    }else{
      next();
    }
  });
  
});
