import { useEffect, useRef, useState } from "react"
import bootstrap from "bootstrap/dist/js/bootstrap.bundle"

export default function Modal({ children }) {

    const modalRef = useRef()
    const [bsModal, setBsModal] = useState()

    useEffect(() => {
        const modal = new bootstrap.Modal(modalRef.current, { backdrop: "static", keyboard: false })
        setBsModal(modal)
    }, [])

    useEffect(() => {
        if(!bsModal) {
            return
        }
        if(!children) {
            bsModal.hide()
        } else {
            bsModal.show()
        }
    }, [children, bsModal])

    
    return (
        <div ref={modalRef} className="modal fade" tabIndex={-1} role="dialog">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-body">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}