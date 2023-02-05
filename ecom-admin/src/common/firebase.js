import { initializeApp } from "firebase/app";
import {
  ref,
  getStorage,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC3wXom9x1baKlm7bfruSqb7M9GnSelP8g",
  authDomain: "amumu-shop.firebaseapp.com",
  projectId: "amumu-shop",
  storageBucket: "amumu-shop.appspot.com",
  messagingSenderId: "338490593851",
  appId: "1:338490593851:web:e715a595eed276653f421e"
};

const app = initializeApp(firebaseConfig);

const storage = getStorage(app)

const upload = (file) => {
  const url = new Promise((resolve, reject) => {
    const fileName = new Date().getTime() + file.name

    const storageRef = ref(storage, fileName)

    const uploadTask = uploadBytesResumable(storageRef, file)

    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        console.log('Upload is ' + progress + '% done')
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
          default:
            ;
        }
      }, (error) => {
        return reject(error)
      }, () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => resolve(downloadURL));
      })
    })

  return url
}

export default upload