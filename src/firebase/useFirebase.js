import {
  createUserWithEmailAndPassword,
  EmailAuthProvider,
  GoogleAuthProvider,
  reauthenticateWithCredential,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateEmail,
  updatePassword,
  updateProfile,
} from "firebase/auth";
import { getDownloadURL, ref } from "firebase/storage";

import { uploadBytes } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getState } from "../context/Context";
import { auth, db, storage } from "./firebase-init";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
} from "firebase/firestore";

export const useFirebase = () => {
  const navigate = useNavigate();
  const { user, setUpdateStatus, setFav, fav } = getState();

  const errorMessage = (mess) => {
    toast.error(mess, {
      position: "top-left",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  const succussMessage = (mess) => {
    toast.success(mess, {
      position: "top-left",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  const createNewUser = async (email, password, userName) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      ).then(() => {
        updateProfile(auth.currentUser, {
          displayName: userName,
        });
      });
      navigate("/");
    } catch (e) {
      if (e.code == "auth/email-already-in-use") {
        errorMessage("This email already exist");
        return e.code;
      } else {
        errorMessage("Something wrong please check your data and try again");
        return e.code;
      }
    }
  };

  const signExistUser = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      navigate("/");
    } catch (e) {
      if (e.code == "auth/user-not-found") {
        errorMessage("user not exist check your data !");
        return e.code;
      } else if (e.code == "auth/wrong-password") {
        errorMessage("Please check your password");
        return e.code;
      } else if (e.code == "auth/too-many-requests") {
        errorMessage("Too many requests please try again after 10s");
        return e.code;
      } else {
        errorMessage("Something wrong please check your data and try again");
        return e.code;
      }
    }
  };

  const UpdateUserData = (currentPassword, name, newEmail) => {
    //----- Show Loader Status -------->
    setUpdateStatus(true);

    signInWithEmailAndPassword(auth, user.email, currentPassword)
      .then(() => {
        updateProfile(auth.currentUser, {
          displayName: name,
        });
      })
      .then(() => {
        updateEmail(auth.currentUser, newEmail)
          .then(() => {
            signOut(auth).then(() => {
              toast.success("Every thing has been updated successfully", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
              });
              //----- Hide Loader Status -------->
              setUpdateStatus(false);
            });
          })
          .catch((e) => {
            if (e.code == "auth/email-already-in-use") {
              errorMessage("This User Email Already Exist");
              //----- Hide Loader Status -------->
              setUpdateStatus(false);
            }
            //----- Hide Loader Status -------->
            setUpdateStatus(false);
          });
      })
      .catch((e) => {
        if (e.code == "auth/wrong-password") {
          errorMessage("Incorrect current password");
        }
        //----- Hide Loader Status -------->
        setUpdateStatus(false);
      });
  };

  const UpdateUserPassword = (currentPassword, newPassword) => {
    // 'file' comes from the Blob or File API'

    //----- Show Loader Status -------->
    setUpdateStatus(true);

    signInWithEmailAndPassword(auth, user.email, currentPassword)
      .then(() => {})
      .then(() => {
        updatePassword(auth.currentUser, newPassword)
          .then(() => {
            signOut(auth).then(() => {
              toast.success("Every thing has been updated successfully", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
              });
              //----- Hide Loader Status -------->
              setUpdateStatus(false);
            });
          })
          .catch((e) => {
            if (e.code == "auth/email-already-in-use") {
              errorMessage("This User Email Already Exist");
              //----- Hide Loader Status -------->
              setUpdateStatus(false);
            }
            //----- Hide Loader Status -------->
            setUpdateStatus(false);
          });
      })
      .catch((e) => {
        if (e.code == "auth/wrong-password") {
          errorMessage("The current password incorrect");
        }
        //----- Hide Loader Status -------->
        setUpdateStatus(false);
      });
  };

  const reAuth = (password, { userName, email, userPassword }) => {
    const credential = EmailAuthProvider.credential(user.email, password);
    setUpdateStatus(true);

    reauthenticateWithCredential(auth.currentUser, credential)
      .then(() => {
        // console.log("done");
      })
      .then(() => {
        if (email) {
          updateEmail(auth.currentUser, email);
          setUpdateStatus(false);
          succussMessage(`Email updated successfully`);
          return 1;
        }
        if (userPassword) {
          updatePassword(auth.currentUser, userPassword);
          setUpdateStatus(false);
          succussMessage(`Password updated successfully`);
          return 1;
        }
        if (userName) {
          updateProfile(auth.currentUser, {
            displayName: userName,
          });
          setUpdateStatus(false);
          succussMessage(`Name updated successfully`);
          return 1;
        }
      })
      .catch((error) => {
        if (error.code == "auth/wrong-password") {
          errorMessage("Please check your password ");
        } else if (error.code == "auth/too-many-requests") {
          errorMessage("Too many requests please try again after 10s");
        } else {
          errorMessage(
            "Something wrong ! please check your data and try again"
          );
        }
        setUpdateStatus(false);
        return error;
      });
  };

  const UpdateUserPhoto = (photo) => {
    const storageRef = ref(storage, `${user.uid}/user-photo`);

    //----- Show Loader Status -------->
    setUpdateStatus(true);

    uploadBytes(storageRef, photo).then((snapshot) => {
      getDownloadURL(snapshot.ref)
        .then((downloadURL) => {
          updateProfile(auth.currentUser, {
            photoURL: downloadURL,
          });
          return downloadURL
        })
        .then(async (downloadURL) => {
          const docSnap = await getDocs(query(collection(db, "Products")));
            docSnap.forEach(async (docSnap) => {
              if(docSnap.exists()){
                if(docSnap.data().userId == user.uid) {
                  await updateDoc(doc(db, "Products", docSnap.data().colId), {
                   ["userPhoto"]: downloadURL,
                 })
               }
              }
            });
        }).then(() => {
          succussMessage("Photo updated successfully");
          setUpdateStatus(false);
       })
    });
  };

  const LogoutUser = () => {
    signOut(auth);
  };

  const GLogin = async () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).catch((e) => {});
  };

  const createDoc = async (data, files) => {
    const {
      productName,
      productPrice,
      productType,
      productCurrency,
      productCountaty,
      phoneNumber,
      productDescription,
    } = data;

    setUpdateStatus(true);
    const promises = [];
    const docRef = await addDoc(collection(db, "Products"), {
      productName,
      productPrice,
      productType,
      productCurrency,
      productCountaty,
      phoneNumber,
      productDescription,
      like: [],
      dislike: [],
      comment: [],
      userId: user.uid,
      userPhoto: user.photoURL,
      userName: user.displayName,
      userEmail: user.email,
    }).catch((e) => {
      errorMessage(
        "warn",
        "Opps something went wrong please try again later !"
      );
    });
    for (var i = 0; i < files.length; i++) {
      // files.values contains all the files objects
      const file = files[i];
      const storageRef = ref(storage, `${docRef.id}/${file.name}`);

      promises.push(
        uploadBytes(storageRef, file)
          .then((uploadResult) => {
            return getDownloadURL(uploadResult.ref);
          })
          .catch((e) => {
            errorMessage(
              "warn",
              "Opps something went wrong please try again later !"
            );
          })
      );
    }

    const photos = await Promise.all(promises);
    return await updateDoc(doc(db, "Products", docRef.id), {
      photosURLs: photos,
      colId: docRef.id,
    })
      .then(() => {
        setUpdateStatus(false);
        succussMessage("Every thing Uploaded successfully");
        return true;
      })
      .catch((e) => {
        errorMessage(
          "warn",
          "Opps something went wrong please try again later !"
        );
      });
  };

  const UpdateLikeDisLike = async (id, docName) => {
    try {
      const docSnap = await getDoc(doc(db, "Products", id));
      const upt = async (newData) => {
        await updateDoc(doc(db, "Products", id), { [docName]: newData })
          .then((newData) => {
            return newData;
          })
          .catch((e) => {
            errorMessage("Opps something went wrong please try again later !");
          });
      };

      const filteration = async () => {
        if (!docSnap.data()[docName].find((e) => e == user.uid)) {
          upt([...docSnap.data()[docName], user.uid]);
        } else {
          upt([...docSnap.data()[docName].filter((e) => e != user.uid)]);
        }
      };

      const checker = async (docName) => {
        await updateDoc(doc(db, "Products", id), {
          [docName]: docSnap.data()[docName].filter((e) => e != user.uid),
        });
      };

      if (docSnap.exists()) {
        docSnap.data()[docName].length == 0 ? upt([user.uid]) : filteration();
        docName == "like" ? checker("dislike") : checker("like");
      } else {
        console.log("Document does not exist");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addComment = async (id, docName, newData) => {
    const docSnap = await getDoc(doc(db, "Products", id));

    if (docSnap.exists()) {
      if (docSnap.data().comment.length > 0) {
        return await updateDoc(doc(db, "Products", id), {
          [docName]: [...docSnap.data().comment, newData],
        })
          .catch((e) => console.log(e))
          .then(() => {
            return [...docSnap.data().comment, newData];
          });
      }
      return await updateDoc(doc(db, "Products", id), { [docName]: [newData] })
        .catch((e) => console.log(e))
        .then(() => {
          return [newData];
        });
    }
  };

  const getData = async (id, docName) => {
    const docSnap = await getDoc(doc(db, "Products", id));

    if (docSnap.exists()) {
      return docSnap.data()[docName] ? docSnap.data()[docName] : docSnap.data();
    }
  };

  const UpdateDoc = async (id, docName, newData, mess) => {
    const docSnap = await getDoc(doc(db, "Users", id));

    if (docSnap.exists()) {
      if (docSnap.data().favoriteProduct.length == 0) {
        await updateDoc(doc(db, "Users", id), { [docName]: [newData] });
      } else {
        if (
          docSnap.data().favoriteProduct.find((e) => e.colId == newData.colId)
        ) {
          await updateDoc(doc(db, "Users", id), {
            [docName]: [
              ...docSnap
                .data()
                .favoriteProduct.filter((e) => e.colId != newData.colId),
            ],
          });
        } else {
          await updateDoc(doc(db, "Users", id), {
            [docName]: [...docSnap.data().favoriteProduct, newData],
          });
        }
      }
    } else {
      const docRef = await setDoc(doc(db, "Users", id), {
        favoriteProduct: [newData],
        messages: mess,
        userId: user.uid,
      }).catch((e) => {
        errorMessage(
          "warn",
          "Opps something went wrong please try again later !"
        );
      });
    }
  };

  const UpdateUserBg = async (photo) => {
    const storageRef = ref(storage, `${user.uid}/user-background`);
    const docSnap = await getDoc(doc(db, "Users", user.uid));

    uploadBytes(storageRef, photo).then((snapshot) => {
      getDownloadURL(snapshot.ref)
        .then((downloadURL) => {
           if(docSnap.exists()){
              updateDoc(doc(db, "Users", user.uid), { "userBg":  downloadURL});
              succussMessage("Background updated successfully")
           }else{
             setDoc(doc(db, "Users", user.uid), 
             {
              favoriteProduct: [],
              messages: 0,
              userId: user.uid,
              userBg:  downloadURL
            });
             succussMessage("Background updated successfully")
           }
        })
    });
  }
  
  return {
    createNewUser,
    signExistUser,
    UpdateUserData,
    UpdateUserPassword,
    reAuth,
    UpdateUserPhoto,
    LogoutUser,
    GLogin,
    createDoc,
    UpdateLikeDisLike,
    addComment,
    getData,
    UpdateDoc,
    UpdateUserBg
  };
};
