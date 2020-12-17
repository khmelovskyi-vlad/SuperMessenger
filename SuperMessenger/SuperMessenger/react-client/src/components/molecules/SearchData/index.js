import React from 'react';
import Button from '../../atoms/Button';
import Form from '../../atoms/Form';
import Input from '../../atoms/Input';

import styles from './style.module.css'

export default function SearchData(props) {
  const className = [props.className, styles[props.size], "form-inline", "my-2", "my-lg-0", "mr-5"];
  return (
    <Form className={className.join(" ")}>
      <Input className="form-control mr-sm-2" type="search" placeholder="Search" ariaLabel="Search"/>
      <Button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</Button>
    </Form>
  );
}