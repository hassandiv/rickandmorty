import React, { useContext, useState, useEffect } from 'react'
import { AppContext } from '../store/StoreProvider'
import { Form, Button } from 'react-bootstrap'
import styles from '../styles/Form.module.css'

const Filter = ({ filterQuery }) => {

    const { query, setQuery, status, setStatus, gender, setGender } = useContext(AppContext)
    const [isOpen, setIsOpen] = useState(false)

    let queryLowerCase = query.toLowerCase()
    let statusLowerCase = status.toLowerCase()
    let genderLowerCase = gender.toLowerCase()

    useEffect(() => {
        filterQuery({
            variables: {
                name: queryLowerCase,
                status: statusLowerCase,
                gender: genderLowerCase
            }
        })
    }, [])

    const handleChange = e => {
        setQuery(e.target.value)
    }

    const handleSelectedStatus = e => {
        setStatus(e.target.value)
    }

    const handleSelectedGender = e => {
        setGender(e.target.value)
    }

    const handleFormSubmit = e => {
        e.preventDefault()
        filterQuery({
            variables: {
                name: queryLowerCase,
                status: statusLowerCase,
                gender: genderLowerCase
            }
        })
        setIsOpen(false)
    }

    const statusTypes = ["All", "Live", "Dead", "Unknown"]
    const genderTypes = ["All", "Female", "Male", "Genderless", "Unknown"]

    return (
        <div className={styles.formContainer + ` ` + `${ isOpen ? styles.heightOpenMobile : styles.heightClosedMobile }`}>
            <Form
                onSubmit={handleFormSubmit}
                className={styles.form}
            >
                <Form.Group className={styles.formGroup} controlId="exampleForm.ControlInput1">
                    <Form.Control 
                        type="text"
                        name="search"
                        placeholder="Search ..."
                        className={styles.searchInput}
                        value={query}
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
                    <Button 
                        variant="primary"
                        type="submit"
                        value="Search"
                    >
                        Search
                    </Button>
                </Form.Group>
            </Form>
        </div>
    )
}
export default Filter