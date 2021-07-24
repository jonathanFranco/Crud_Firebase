import React, { Fragment } from "react";
import { styles } from "src/types/types";
import Button from "src/components/Button";
import Input from "src/components/Input";
import { useCrud } from "src/contexts/user";

const Home = () => {
    const {
        valor,
        posts,
        user,
        submitItem,
        deleteItem,
        logOut,
        showValues,
        resetValues,
        onChange
    } = useCrud();

    return (
        <div className={`container mx-auto h-screen grid items-center`}>
            <div>
                <Fragment>
                    <div className={`grid grid-cols-12 justify-items-center items-center w-full divide-x gap-3`}>
                        <div className={`col-span-12 md:col-span-5 w-full`}>
                            <section id={`form`}>
                                <div className={`flex justify-center space-x-3 items-center`}>
                                    <p className={`text-xl md:text-lg text-gray-900 font-bold text-center p-2`}>React Js + Firebase</p>
                                    <Button props={{ btnStyle: `${styles.btn.red} text-sm`, onClick: logOut, title: "Sair" }} />
                                </div>
                                <form onSubmit={submitItem}>

                                    <p className={`text-lg text-gray-600 text-center p-2`}>{user?.email}</p>
                                    <div className={`p-5 grid grid-cols-12 gap-5 justify-items-center items-center`}>
                                        <Input
                                            props={{
                                                title: "Nome",
                                                name: "autor",
                                                titleStyle: styles.title,
                                                inputStyle: styles.input,
                                                value: valor?.autor,
                                                onChange: onChange
                                            }}
                                        />
                                        <Input
                                            props={{
                                                title: "Curso",
                                                name: "titulo",
                                                titleStyle: styles.title,
                                                inputStyle: styles.input,
                                                value: valor?.titulo,
                                                onChange: onChange
                                            }}
                                        />
                                    </div>
                                    <div id={`btn`} className={`flex justify-center space-x-5`}>
                                        {valor?.id ? (
                                            <Button props={{ btnStyle: styles.btn.blue, title: "Atualizar" }} />
                                        ) : (
                                            <Button props={{ btnStyle: styles.btn.blue, title: "Cadastrar" }} />
                                        )}
                                        <Button props={{ btnStyle: styles.btn.red, onClick: resetValues, title: "Limpar" }} />
                                    </div>
                                </form>
                            </section>
                        </div>
                        <div className={`col-span-12 md:col-span-7 w-full`}>
                            <section id={`list`}>
                                <ul className={`my-5 px-8 overflow-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 scrollbar-thumb-rounded-full scrollbar-track-rounded-full`} style={{ height: "465px" }}>
                                    {posts?.map((item: any) => {
                                        return (
                                            <li key={item?.id} className={`text-sm bg-blue-100 rounded-lg shadow-xs p-2 my-2 text-gray-900`}>
                                                <p className={`font-bold`}>{item?.autor}</p>
                                                <p className={`text-xs text-gray-700`}>{item?.titulo}</p>
                                                <div className={`flex justify-end space-x-3`}>
                                                    <Button props={{ btnStyle: `text-xs my-2 ${styles.btn.blue}`, onClick: () => showValues({ id: item?.id, autor: item?.autor, titulo: item?.titulo }), icon: "edit" }} />
                                                    <Button props={{ btnStyle: `text-xs my-2 ${styles.btn.red}`, onClick: () => deleteItem(item?.id), icon: "delete" }} />
                                                </div>
                                            </li>
                                        )
                                    })}
                                </ul>
                            </section>
                        </div>
                    </div>
                </Fragment>
            </div>
        </div>
    )
}
export default Home;