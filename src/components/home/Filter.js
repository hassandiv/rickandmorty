import React, { useContext, useState } from 'react'
import { AppContext } from '../../store/StoreProvider'
import { Form, Button } from 'react-bootstrap'
import styles from '../../styles/Form.module.css'

const Filter = () => {

    const { name, setName, status, setStatus, gender, setGender } = useContext(AppContext)
    const [isOpen, setIsOpen] = useState(false)

    const handleChange = e => {
        setName(e.target.value)
    }

    const handleSelectedStatus = e => {
        setStatus(e.target.value)
    }

    const handleSelectedGender = e => {
        setGender(e.target.value)
    }

    const statusTypes = ["All", "Live", "Dead", "Unknown"]
    const genderTypes = ["All", "Female", "Male", "Genderless", "Unknown"]

    return (
        <div className={styles.formContainer + ` ` + `${ isOpen ? styles.heightOpenMobile : styles.heightClosedMobile }`}>
            <Form className={styles.form}>
                <Form.Group className={styles.formGroup} controlId="exampleForm.ControlInput1">
                    <Form.Control 
                        type="text"
                        name="search"
                        placeholder="Search ..."
                        className={styles.searchInput}
                        value={name}
                        onChange={handleChange}
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
                                        type="radio"
                                        value={statusType !== "All" ? statusType : "" }
                                        label={statusType}
                                        checked={status === `${statusType !== "All" ? statusType : ""}`}
                                        onChange={handleSelectedStatus}
                                    />
                                )}
                            </div>
                            <div className="d-flex flex-column">
                                <span className="pb-2">Select Gender</span>
                                {genderTypes?.map((genderType, index) => 
                                    <Form.Check
                                        key={index}
                                        type="radio"
                                        value={genderType !== "All" ? genderType : "" }
                                        label={genderType}
                                        checked={gender === `${genderType !== "All" ? genderType : ""}`}
                                        onChange={handleSelectedGender}
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