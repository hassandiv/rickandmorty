import React, { useContext, useState } from 'react'
import { AppContext } from '../../store/StoreProvider'
import { Form, Button } from 'react-bootstrap'
import styles from '../../styles/Form.module.css'

const Filter = () => {

    const { query, setQuery } = useContext(AppContext)
    const [isOpen, setIsOpen] = useState(false)

    const { name, status, gender } = query

    const handleQuery = e => {
        setQuery({...query, [e.target.name]: e.target.value})
    }

    const statusTypes = ["All", "Live", "Dead", "Unknown"]
    const genderTypes = ["All", "Female", "Male", "Genderless", "Unknown"]

    return (
        <div className={styles.formContainer + ` ` + `${ isOpen ? styles.heightOpenMobile : styles.heightClosedMobile }`}>
            <Form className={styles.form}>
                <Form.Group className={styles.formGroup} controlId="exampleForm.ControlInput1">
                    <Form.Control 
                        type="text"
                        name="name"
                        placeholder="Search ..."
                        className={styles.searchInput}
                        value={name}
                        onChange={handleQuery}
                    />
                    <div className={styles.advancedFilter}>
                        <Button 
                            variant="primary"
                            className={styles.advancedFilterBtn}
                            onClick={() => setIsOpen(!isOpen)}
                        >
                            Advanced Filter
                        </Button>
                        <div className={isOpen ? styles.dropDown : "d-none"}>
                            <div className="d-flex flex-column">
                                <span className="pb-2">Select Status</span>
                                {statusTypes?.map((statusType, index) => 
                                    <Form.Check
                                        key={index}
                                        name="status"
                                        type="radio"
                                        value={statusType !== "All" ? statusType : "" }
                                        label={statusType}
                                        checked={status === `${statusType !== "All" ? statusType : ""}`}
                                        onChange={handleQuery}
                                    />
                                )}
                            </div>
                            <div className="d-flex flex-column">
                                <span className="pb-2">Select Gender</span>
                                {genderTypes?.map((genderType, index) => 
                                    <Form.Check
                                        key={index}
                                        name="gender"
                                        type="radio"
                                        value={genderType !== "All" ? genderType : "" }
                                        label={genderType}
                                        checked={gender === `${genderType !== "All" ? genderType : ""}`}
                                        onChange={handleQuery}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </Form.Group>
            </Form>
        </div>
    )
}

export default Filter