import React, { useState, useEffect } from 'react';
// import axios from 'axios';
import * as Yup  from 'yup';
import './PizzaForm.css';

import Nav from './Nav';

const formSchema = Yup.object().shape({
  name: Yup
    .string()
    .required()
});


function PizzaForm() {
  const [formData, setFormData] = useState({
    name: '',
    instructions: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    instructions: '',
  });

  const [post, setPost] = useState([]);
  const [buttonDisabled, setButtonDisabled] = useState(true);


  useEffect(() => {
    formSchema.isValid(formData).then(valid => {
      setButtonDisabled(!valid);
    });
  }, [formData]);

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
      <form>
        <label htmlFor="name">
          Pizza Name: 
          <input
            type="text" 
            name="name"
            value={formData.name} 
            onChange={handleChange}
          />
        </label>
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
            <input type="checkbox" id="topping1" name="pepperoni" value="Pepperoni" />
          </label> 
          <label htmlFor="Canadian Bacon">Canadian Bacon
            <input type="checkbox" id="topping2" name="canadian bacon" value="Canadian Bacon" />
          </label> 
          <label htmlFor="Artichoke Hearts">Artichoke Hearts
            <input type="checkbox" id="topping3" name="artichoke hearts" value="Artichoke Hearts" />
          </label> 
          <label htmlFor="Three Cheese">Three Cheese
            <input type="checkbox" id="topping4" name="three cheese" value="Three Cheese" />
          </label>
        </div>
        <label htmlFor="special-instructions">
          Special instructions:
          <textarea 
            value={formData.instructions} 
            onChange={handleChange} />
        </label>
        <button 
          type="submit"
          disabled={buttonDisabled}
        >
          Add to Order
        </button>
      </form>
    </div>
    </>
  );
}

export default PizzaForm;