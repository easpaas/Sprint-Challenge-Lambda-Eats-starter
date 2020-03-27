import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as Yup  from 'yup';
import './PizzaForm.css';

import Nav from './Nav';

const formSchema = Yup.object().shape({
  name: Yup
    .string().matches('[a-zA-Z]{2,}', 'Must have two or more characters')
    .required('Name field is required.'),
  size: Yup
    .string(),
  topping1: Yup
    .boolean().oneOf([true], "topping choosen"),
  topping2: Yup
    .boolean().oneOf([true], "topping choosen"),
  topping3: Yup
    .boolean().oneOf([true], "topping choosen"),
  topping4: Yup
    .boolean().oneOf([true], "topping choosen"),
  instructions: Yup
    .string()
});


function PizzaForm() {
  const [formData, setFormData] = useState({
    name: '',
    size: '',
    topping1: '',
    topping2: '',
    topping3: '',
    topping4: '',
    instructions: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    size: '',
    topping1: '',
    topping2: '',
    topping3: '',
    topping4: '',
    instructions: '',
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("https://reqres.in/api/data", formData)
      .then(res => {
        console.log(res.data)
        setFormData({
          name: '',
          size: '',
          topping1: '',
          topping2: '',
          topping3: '',
          topping4: '',
          instructions: '',
        });
      })
      .catch(err => console.log(err.response));
    setFormData({ 
      name: '',
      size: '',
      topping1: '',
      topping2: '',
      topping3: '',
      topping4: '',
      instructions: '',
    });
  };

  const validateChange = event => {
    Yup
      .reach(formSchema, event.target.name)
      .validate(event.target.value)
      .then(valid => {
        setErrors({
          ...errors,
          [event.target.name]: ""
        });
      })
      .catch(err => {
        setErrors({
          ...errors,
          [event.target.name]: err.errors[0]
        });
      });
  };

  const handleChange = event => {
    event.persist();
    const newFormData = {
      ...formData,
      [event.target.name]:
        event.target.type === "checkbox" ? event.target.checked : event.target.value
    };
    validateChange(event);
    setFormData(newFormData);
  };

  return (
    <>
    <Nav />
    <h1>Pizza Order</h1>
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">
          Pizza Name: 
          <input
            type="text" 
            name="name"
            value={formData.name} 
            onChange={handleChange}
          />
        </label>
        {
          errors.name.length > 0 ? 
          <p className="error">{errors.name}</p> 
          : 
          null
        }
        <label htmlFor="sizes">
          Choose a size: 
          <select
            id="size"
            name="size"
            onChange={handleChange}
          >
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
            <option value="family">Family</option>
          </select>
        </label>
        <div className="toppings">
          <h3>Choose up to 4 toppings</h3>
          <label htmlFor="Pepperoni">Pepperoni
            <input type="checkbox" id="topping1" name="topping1" value={formData.topping1} checked={formData.topping1} onChange={handleChange} />
          </label> 
          <label htmlFor="Canadian Bacon">Canadian Bacon
            <input type="checkbox" id="topping2" name="topping2" value={formData.topping2} checked={formData.topping2} onChange={handleChange} />
          </label> 
          <label htmlFor="Artichoke Hearts">Artichoke Hearts
            <input type="checkbox" id="topping3" name="topping3" value={formData.topping3} checked={formData.topping3} onChange={handleChange} />
          </label> 
          <label htmlFor="Three Cheese">Three Cheese
            <input type="checkbox" id="topping4" name="topping4" value={formData.topping4} checked={formData.topping4} onChange={handleChange} />
          </label>
        </div>
        <label htmlFor="instructions">
          Special instructions:
          <textarea 
            name="instructions"
            value={formData.instructions} 
            onChange={handleChange} />
        </label>
        <button 
          type="submit"
          // disabled={buttonDisabled}
        >
          Add to Order
        </button>
      </form>
    </div>
    </>
  );
}

export default PizzaForm;