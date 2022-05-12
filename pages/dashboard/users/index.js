import React, { useState, useEffect, useRef } from "react";
import { useRouter } from 'next/router'
import { classNames } from "primereact/utils";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";
import { Button } from "primereact/button";
import { ProgressBar } from "primereact/progressbar";
import { Calendar } from "primereact/calendar";
import { MultiSelect } from "primereact/multiselect";
import { Slider } from "primereact/slider";
import { TriStateCheckbox } from "primereact/tristatecheckbox";
import { Dialog } from "primereact/dialog";
import { Avatar } from "primereact/avatar";
import { Toast } from 'primereact/toast';



import Axios from "../../../services/axios";
import { Card } from "../../../components/common";
import { Dashboard } from "../../../components/dashboard";
import useFormValidation from "../../../components/common/form/useFormValidation";
import { InputFieldWrapper } from "../../../components/common/input";

const Users = () => {
  const [users, setUsers] = useState(null);
  const [loading, setLoading] = useState(true);
  const [displayModal, setDisplayModal] = useState(false);
  const toast = useRef(null);
  const router = useRouter()
  const newUser = useFormValidation(
    {
      username: "",
      password: 'asinyo1234'
    },
    {
      username: "required|email",
      password: "required|min:8",
    },
    addUser
  );



  async function addUser() {
    Axios
      .post(`/admins/create`, newUser.state)
      .then(({ data }) => {
        toast.current.show({ severity: 'success', summary: 'User added successfully', life: 3000 })
        router.push('/dashboard/users')
      })
      .catch((err) => {
        newUser.updateIsSubmitting(false);
        if (err['response']) {
          if (err.response.status === 422) {
            newUser.setServerErrors(err.response.data)
          }
          else if (err.response.status === 429) {
            toast.current.show({ severity: 'warn', summary: 'Too Many Requests! Wait for some few minutes and try again.', life: 3000 })
          }
          else if (err.response.status === 500) {
            toast.current.show({ severity: 'error', summary: 'Ooops! Something went wrog, please refresh and try again.', life: 3000 })
          }
          else {
            console.trace(err);
          }
        }
        else {
          console.trace(err);
        }
      });
  }



  const formatDate = (value) => {
    const d = new Date(value);
    const options = {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    return d.toLocaleDateString("en-GH", options);
  };

  const renderHeader = () => {
    return (
      <div className='flex justify-content-between'>
        <Button
          type='button'
          icon='pi pi-filter-slash'
          label='Clear'
          className='p-button-outlined'
        />
        <span className='p-input-icon-left'>
          <i className='pi pi-search' />
          <InputText placeholder='Keyword Search' />
        </span>
      </div>
    );
  };

  const avatarBody = (row) => {
    if (row.avatar) {
      return <Avatar image={row.avatar} size='large' shape='circle' />;
    }
    return (
      <Avatar
        icon='pi pi-user'
        size='large'
        style={{ color: "#ffffff" }}
        shape='circle'
      />
    );
  };
  const usernameBody = (row) => {
    return <span className='image-text'>{row.username}</span>;
  };
  const otherNameBody = (row) => {
    return <span className='image-text'>{row.otherName.split(" ")[0]}</span>;
  };
  const statusBody = (row) => {
    return (
      <span className='image-text'>{row.status ? "Online" : "offline"}</span>
    );
  };

  const lastActiveBody = (row) => {
    return formatDate(row.lastActive);
  };

  const renderFooter = (name) => {
    return (
      <div>
        <Button
          label='No'
          icon='pi pi-times'
          onClick={() => setDisplayModal(false)}
          className='p-button-text'
        />
        <Button
          label='Yes'
          icon='pi pi-check'
          onClick={() => setDisplayModal(false)}
          autoFocus
        />
      </div>
    );
  };

  useEffect(() => {
    Axios
      .get("http://localhost:3001/api/users")
      .then((res) => {
        setUsers(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Dashboard>
      <Toast ref={toast} />
      <Dialog
        header='Add New User'
        visible={displayModal}
        modal={false}
        style={{ width: "40vw" }}
        onHide={() => setDisplayModal(false)}>
        <form onSubmit={newUser.handleSubmit}>
          <InputFieldWrapper
            label='Username'
            id='username'
            errors={newUser.errors.username}>
            <InputText
              id='username'
              aria-describedby='username'
              name='username'
              value={newUser.state.username}
              onChange={newUser.handleChange}
              onBlur={newUser.handleBlur}
            />
          </InputFieldWrapper>
          <InputFieldWrapper
            label='Password'
            id='password'
            errors={newUser.errors.password}>
            <InputText
              id='password'
              aria-describedby='password'
              name='password'
              value={newUser.state.password}
              onChange={newUser.handleChange}
              onBlur={newUser.handleBlur}
            />
          </InputFieldWrapper>
          <div className='submit__button'>
            <Button
              type='submit'
              label='Add'
              className='p-button-success'
              icon='pi pi-check'
              loading={newUser.isSubmitting}
            />
          </div>
        </form>
      </Dialog>
      <Card>
        <div className='table__header'>
          <h3>Users</h3>
          <Button
            type='button'
            label='Add New User'
            className='p-button-primary'
            icon='pi pi-plus'
            onClick={() => setDisplayModal(true)}
          />
        </div>
        <DataTable
          value={users}
          paginator
          className='p-datatable-customers'
          rows={10}
          dataKey='id'
          loading={loading}
          responsiveLayout='scroll'
          header={renderHeader}
          emptyMessage='No user found.'>
          <Column
            field='name'
            header='Avatar'
            style={{ minWidth: "5rem", textAlign: "center" }}
            body={avatarBody}
          />
          <Column
            header='Username'
            filterField='users.username'
            style={{ minWidth: "12rem" }}
            body={usernameBody}
          />
          <Column
            header='Other Name'
            filterField='representative'
            showFilterMatchModes={false}
            filterMenuStyle={{ width: "14rem" }}
            style={{ minWidth: "14rem" }}
            body={otherNameBody}
          />
          <Column
            header='Status'
            filterField='date'
            dataType='date'
            style={{ minWidth: "10rem" }}
            body={statusBody}
          />
          <Column
            header='Last Active'
            filterField='date'
            dataType='date'
            style={{ minWidth: "10rem" }}
            body={lastActiveBody}
          />
        </DataTable>
      </Card>
    </Dashboard>
  );
};

export default Users;
