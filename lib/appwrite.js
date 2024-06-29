import { Account , Client , ID , Avatars, Databases, Query } from 'react-native-appwrite';

export const config = {
  endpoint : 'https://cloud.appwrite.io/v1' ,
  platform: 'com.jsm.nexathread',
  projectId: '667ab53b0009d77c1e4a' ,
  databaseId :'667aba66001574a8f9a8' ,
  userCollectionId : '667abaa50005872a99ce' ,
  videoCollectionId : '667abaf9000f8057ea62',
  storageId : '667abcb300339163d748'
}

const client = new Client();

client
    .setEndpoint(config.endpoint) 
    .setProject(config.projectId) 
    .setPlatform(config.platform) 
; 

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

export const createUser = async (email , password , username) => {

  try {
    const newAccount = await account.create(
      ID.unique(),
      email ,
      password,
      username
    )
    if(!newAccount) throw Error;

    const avatarUrl = avatars.getInitials(username)

    await signIn(email,password)

    const newUser = await databases.createDocument(
      config.databaseId,
      config.userCollectionId,
      ID.unique(),
      {
        accountid:newAccount.$id,
        email,
        username,
        avatar:avatarUrl
      }
    )

    return newUser;
  }
   catch (error) {
    console.log(error);
    throw new Error(error);
  }
}

export const  signIn = async (email , password) =>{
  try {
    
    const session = await account.createEmailPasswordSession(email , password)

    return session;
  } catch (error) {
    throw new Error(error);
  }
}

export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();

    if(!currentAccount) throw Error;

    const currentUser = await databases.listDocuments(
      config.databaseId,
      config.userCollectionId,
      [Query.equal('accountid' , currentAccount.$id )]
    )
    if(!currentUser) throw Error;

    return currentUser.documents[0];
  } catch (error) {
    console.log(error)
  }
}
