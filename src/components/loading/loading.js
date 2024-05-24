import { createContext, useState } from "react";
import Modal from "../modal/modal";

export const LoadingContext = createContext()

export default function Loading({ children }) {

    const [contador, setContador] = useState(0)

    const plus = async () => {
        setContador(contador + 1)
    }

    const minus = async () => {
        setContador(contador - 1)
    }

    return (
        <LoadingContext.Provider value={{ plus, minus }}>
            <Modal>
                {
                    contador > 0 &&
                    (
                        <div className="d-flex justify-content-center">
                            <div className="spinner-border" role="status">
                                <span className="visually-hidden">Carregando...</span>
                            </div>
                        </div>
                    )
                }
            </Modal>
            {children}
        </LoadingContext.Provider>
    )
}