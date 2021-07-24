import React, { Fragment } from "react";
import Button from "src/components/Button";
import Input from "src/components/Input";
import { useCrud } from "src/contexts/user";
import { styles } from "src/types/types";

const Login = () => {
    const {
        auth,
        authCadastro,
        logIn,
        loader,
        onChange
    } = useCrud();
    return (
        <Fragment>
            <section id={`form-auth`} className={`grid items-center h-screen`}>
                <div className={`grid justify-center`}>
                    <p className={`text-3xl text-gray-900 font-bold text-center p-2`}>CRUD FIREBASE</p>
                    <div className={`p-5 grid grid-cols-12 gap-5 justify-items-center items-center`}>
                        <Input
                            props={{
                                title: "Email",
                                name: "email",
                                titleStyle: styles.title,
                                inputStyle: styles.input,
                                value: auth?.email,
                                onChange: onChange
                            }}
                        />

                        <Input
                            props={{
                                title: "Senha",
                                type: "password",
                                name: "senha",
                                titleStyle: styles.title,
                                inputStyle: styles.input,
                                value: auth?.senha,
                                onChange: onChange
                            }}
                        />
                    </div>
                    <div id={`btn`} className={`flex justify-center space-x-5`}>
                        <Button props={{ btnStyle: styles.btn.blue, onClick: authCadastro, title: "Cadastrar", loader: loader.cadastro }} />
                        <Button props={{ btnStyle: styles.btn.red, onClick: logIn, title: "Login", loader: loader.login }} />
                    </div>
                </div>
            </section>
        </Fragment>
    )
}
export default Login;