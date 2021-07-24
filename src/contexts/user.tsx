import React, { useState, createContext, useEffect, useContext } from "react";
import firebase from "src/services/firebase";
import { toast } from "react-toastify";

export const CrudContext = createContext({} as any);

const UserProvider = ({ children }: any) => {
  const [valor, setValor] = useState<any>({
    id: "",
    autor: "",
    titulo: "",
  });
  const [auth, setAuth] = useState<any>({
    email: "",
    senha: "",
    user: false,
    userLogged: {},
  });

  const [loader, setLoader] = useState<any>({
    cadastro: false,
    login: false
    // page: false
  });
  const [posts, setPosts] = useState([]);
  const data: any = localStorage.getItem(`user`);
  const user = JSON.parse(data) || [];

  useEffect(() => {
    async function loadPosts() {
      await firebase
        .firestore()
        .collection(`posts`)
        .onSnapshot((doc) => {
          let meusPosts: any = [];
          doc?.forEach((item) => {
            meusPosts.push({
              id: item?.id,
              autor: item?.data().autor,
              titulo: item?.data().titulo,
            });
          });
          setPosts(meusPosts);
        });
    }
    loadPosts();
    setValor({ id: "", autor: "", titulo: "" });
  }, []);

  useEffect(() => {
    async function checkLogin() {
      await firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          setAuth({
            user: true,
            userLogged: { uid: user.uid, email: user.email },
          });
        } else {
          setAuth({ user: false, userLogged: {} });
        }
      });
    }
    checkLogin();
  }, []);

  async function submitItem(event: { preventDefault: () => void; }) {
    event.preventDefault();
    if (valor?.autor === "" || valor?.titulo === "") {
      toast.error("Preencha todos os campos!!");
    } else {
      valor?.id
        ? await firebase
          .firestore()
          .collection(`posts`)
          .doc(valor?.id)
          .update({ autor: valor?.autor, titulo: valor?.titulo })
          .then(() => {
            toast.success("Deu certo, foi atualizado!!");
            setValor({ id: "", autor: "", titulo: "" });
          })
          .catch(() => {
            console.log("ERRO AO ATUALIZAR");
          })
        : await firebase
          .firestore()
          .collection(`posts`)
          .add({ autor: valor?.autor, titulo: valor?.titulo })
          .then(() => {
            toast.success("Deu Certo!!");
            setValor({ id: "", autor: "", titulo: "" });
          })
          .catch(() => {
            console.log("ERRO AO CADASTRAR");
          });
    }
  }

  async function deleteItem(id: string | undefined) {
    await firebase
      .firestore()
      .collection(`posts`)
      .doc(id)
      .delete()
      .then(() => {
        toast.success("Excluído com sucesso!!");
        setValor({ id: "", autor: "", titulo: "" });
      })
      .catch(() => {
        console.log("ERRO AO ATUALIZAR");
      });
  }

  async function authCadastro() {
    if (auth?.email === "" || auth.senha === "") {
      toast.error("Preencha todos os campos!!");
    } else {
      setLoader({ cadastro: true });
      await firebase
        .auth()
        .createUserWithEmailAndPassword(auth.email, auth.senha)
        .then((value) => {
          toast.success("Usuário Cadastrado");
          localStorage.setItem("user", JSON.stringify(value.user));
        })
        .catch((error) => {
          error.code === `auth/weak-password` && toast.error("Senha fraca!!");
          error.code === `auth/email-already-in-use` &&
            toast.error("Usuário já foi Cadastrado");
        }).finally(() => {
          setLoader({ cadastro: false });
        });
    }
  }

  async function logIn() {
    if (auth?.email === "" || auth.senha === "") {
      toast.error("Preencha todos os campos!!");
    } else {
      setLoader({ login: true });
      await firebase
        .auth()
        .signInWithEmailAndPassword(auth?.email, auth?.senha)
        .then((value) => {
          console.log(value.user);
          localStorage.setItem("user", JSON.stringify(value.user));
        })
        .catch((error) => {
          toast.error("Usuário não está cadastrado");
        }).finally(() => {
          setLoader({ login: false });
        });
    }
  }

  async function logOut(event: { preventDefault: () => void; }) {
    event.preventDefault();
    await firebase.auth().signOut();
    setAuth({ email: "", senha: "", user: false, userLogged: {} });
  }

  function onChange(event: any) {
    const { name, value } = event.target;
    setValor({
      ...valor,
      [name]: value,
    });
    setAuth({
      ...auth,
      [name]: value,
    });
  }

  function showValues({ id, autor, titulo }: any) {
    setValor({
      id: id,
      autor: autor,
      titulo: titulo,
    });
  }

  function resetValues(event: { preventDefault: () => void; }) {
    event.preventDefault();
    setValor({ id: "", autor: "", titulo: "" });
  }

  return (
    <CrudContext.Provider
      value={{
        valor,
        auth,
        posts,
        user,
        loader,
        submitItem,
        deleteItem,
        authCadastro,
        logIn,
        logOut,
        showValues,
        resetValues,
        onChange,
      }}
    >
      {children}
    </CrudContext.Provider>
  );
};

function useCrud() {
  return useContext(CrudContext);
}

export { UserProvider, useCrud };