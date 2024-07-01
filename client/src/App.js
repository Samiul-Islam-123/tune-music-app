// src/App.js
import React, { useEffect } from 'react';
import axios from 'axios';
import { useUser } from '@clerk/clerk-react';
import Main from './components/Main';

const App = () => {
    const { user , isSignedIn} = useUser();

    const saveUser = async () => {
      if (user) {
          
        const userData = {
          username : user.fullName,
          email : user.primaryEmailAddress.emailAddress,
          profileImageURL : user.imageUrl,
          clerkID : user.id
        }

          try {
              const reponse = await axios.post(`${process.env.REACT_APP_API_URL}/user`,userData);
              console.log(reponse)
              if(reponse.data.success != true){
                alert(reponse.data.message)
              }
          } catch (error) {
              console.error('Error saving user:', error);
          }
      }
  };

    useEffect(() => {

      console.log(isSignedIn)
        if(isSignedIn === false)
         console.log("Saving bitch...")

        

    }, [user]);

    return (
        <div>
            <Main />
        </div>
    );
};

export default App;
