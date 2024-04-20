// Write your code here

import {Component} from 'react'
import {v4} from 'uuid'
import AppointmentItem from '../AppointmentItem'
import './index.css'

class Appointments extends Component {
  state = {
    titleInput: '',
    dateInput: '',
    isAppoint: true,
    listOfAppoint: [],
  }

  onToggleStar = id => {
    this.setState(prevState => ({
      listOfAppoint: prevState.listOfAppoint.map(eachItem => {
        if (eachItem.id === id) {
          return {...eachItem, isStarted: !eachItem.isStarted}
        }
        return eachItem
      }),
    }))
  }

  onFilter = () => {
    const {isAppoint} = this.state
    this.setState({isAppoint: !isAppoint})
  }

  addAppointmentList = event => {
    event.preventDefault()
    const {titleInput, dateInput} = this.state
    const formattedDate = dateInput
      ? format(new Date(dateInput), 'dd MMMM yyyy, EEEE')
      : ''
    const newAppointment = {
      id: {v4},
      title: titleInput,
      date: formattedDate,
      isStarted: false,
    }
    this.setState(prevState => ({
      listOfAppoint: [...prevState.listOfAppoint, newAppointment],
      titleInput: '',
      dateInput: '',
    }))
  }

  inputTitle = event => {
    this.setState({titleInput: event.target.value})
  }
  inputDate = event => {
    this.setState({dateInput: event.target.value})
  }

  getRenderAppointment = () => {
    const {isAppoint, listOfAppoint} = this.state

    if (isAppoint) {
      return listOfAppoint.filter(eachItem => eachItem.isStarted === true)
    }
    return listOfAppoint
  }

  render() {
    const {titleInput, dateInput, isAppoint, listOfAppoint} = this.state
    const filterClassName = isAppoint ? 'filter-field' : 'filter-empty'

    const filterAppointmentList = this.getRenderAppointment()

    return (
      <div className="classContainer">
        <div className="backgroundContainer">
          <div className="addDetailesContainer">
            <div className="appointmentContainer">
              <h1>Add Appointment</h1>
              <form onSubmit={this.addAppointmentList}>
                <div className="inputContainer">
                  <label htmlFor="title" className="title">
                    TITLE
                  </label>
                  <input
                    type="text"
                    placeholder="Title"
                    value={titleInput}
                    id="title"
                    onChange={this.inputTitle}
                  />
                  <label htmlFor="date">DATE</label>
                  <input
                    placeholder="Date"
                    value={dateInput}
                    type="date"
                    id="date"
                    onChange={this.inputDate}
                  />
                </div>

                <button type="submit" className="addButon">
                  Add
                </button>
              </form>
            </div>
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
              className="img1"
            />
          </div>
          <hr className="line" />
          <ul>
            <div className="bottomContainer">
              <h1 className="headApp">Appointment</h1>
              <button
                className={`startButon ${filterClassName}`}
                onClick={this.onFilter}
              >
                Started
              </button>
            </div>
            <ui>
              {filterAppointmentList.map(eachAppoint => (
                <AppointmentItem
                  appointmentsItem={eachAppoint}
                  startToggle={this.onToggleStar}
                  key={eachAppoint.id}
                />
              ))}
            </ui>
          </ul>
        </div>
      </div>
    )
  }
}

export default Appointments
