import React, { useState, useEffect } from "react";
import axios from "axios";
import * as yup from "yup";

const formSchema = yup.object().shape({ //2) set the text restrictions.
    name: yup //this will be our text input field
        .string()
        .required("Must input name before proceeding")
        .min(2, "Name must be longer than 2 letters."), //2 character min
    size: yup //we will be making this a drop down
        .string()
        .required("Must choose pizza size before proceeding."),
    instructions: yup //similar to the name, text input
        .string()
        .required("Must give us instructions on what you want"),
    toppings: yup //we will be making this a checklist
        .boolean()
        .oneOf([true], "Must choose one")


    
});
        

export default function Form (){
    const [ button, setButton ] = useState(true); //1) Make a state for button that won't let you move forward until everything is filled out.

    const [ formState, setFormState ] = useState({ //3 Set our form state
        name:"",
        size:"",
        instructions:"",
        toppings:""

    })

    const [ errors, setErrors ] = useState ({ //4) Set our error state
        name:"",
        size:"",
        instructions:"",
        toppings:""
    })

    const [ post, setPost ] = useState([]); //5) Setting state for your post request

    useEffect(()=>{ //6) This is checking the formSchema, which is a model for our form, so every form we create has to follow those rules we've set. It is checked if it is valid vs what the user is putting in. If the user doesn't follow our instructions then it won't change the button to light up and be valid.
        formSchema.isValid(formState).then(valid => {
            setButton(!valid);
        })
    }, [formState]);

    const formSubmit = e => { //6) Form submit state
        e.preventDefault();
        axios
            .post("https://reqres.in/api/pizzas", formState)
            .then(response => {
                setPost(response.data);

                setFormState({
                    name:"",
                    size:"",
                    instructions:"",
                    toppings:""
                })
           })
           .catch(errors => console.log("something went wrong when submitting your order"));
    }
    const validateChange = e => { //7)
        yup
            .reach(formSchema, e.target.name)
            .validate(e.target.name === "toppings" ? e.target.checked: e.target.value) //may have to change toppings to terms. 
            .then(valid => {
                setErrors({
                    ...errors,
                    [e.target.name]: ""
                })
            })
            .catch(errors =>{
                setErrors({
                    ...errors,
                    [e.target.name]: errors.errors[0]
                });
            });
    };

    const inputChange = e => {
        e.persist(); //constantly checking to see what the user is typing in and checking if its valid
        const newFormData = {
            ...formState,
            [e.target.name]:
            e.target.type /*=== "checkbox" ? e.target.checked: e.target.value*/
        };
        validateChange(e);
        setFormState(newFormData);
    };
    
    return (
        <form onSubmit={formSubmit}>
            <h1>You can get any toppings, which ones are you choosing?</h1>
            <label htmlFor="name" >
                Name:
                <input
                    id="name" //This connects the htmlFor to the id, make sure they have the same name
                    type="text"
                    name="name"
                    value={formState.name}
                    onChange={inputChange}
                />
                {/* This error connects with the schema for the first error that we have written */}
                {errors.name.length > 0 ? <p className="errors">{errors.name}</p>: null}
            </label><br/>

            <label htmlFor="size">
                Choose Your Size:
                <select
                id="size"
                // type="dropdown"
                name="size"
                // value={formState.size}
                onChange={inputChange}
                >
                <option value="small">Small</option>
                <option value="medium">Small</option>
                <option value="large">Small</option>
                </select>      
            </label> <br/>

            <label htmlFor="instructions">
                What are your instructions?
                <textarea
                id="instructions"
                // name="size"
                // value={formState.instructions}
                onChange={inputChange}
                />
                {errors.instructions.length > 0 ? <p className="errors">{errors.instructions}</p>: null}        
            </label> <br/>

            <label htmlFor="toppings">
                What are your instructions?
                <textarea
                id="instructions"
                // name="size"
                // value={formState.instructions}
                onChange={inputChange}
                />
                {errors.instructions.length > 0 ? <p className="errors">{errors.instructions}</p>: null}        
            </label> <br/>
        </form>
    )
};