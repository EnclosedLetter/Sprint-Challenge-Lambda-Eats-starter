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
        seze:"",
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
            .post("https://reqres.in/api/orders", formState)
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
            .validate(e.target.valve ===)
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
                })
            })
    }
};