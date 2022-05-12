import React, { useState, useEffect, useRef } from "react";
import { useRouter } from 'next/router'
import { TreeTable } from "primereact/treetable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { OverlayPanel } from "primereact/overlaypanel";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Toast } from 'primereact/toast';
import { useAtom } from 'jotai'
import { useHydrateAtoms } from 'jotai/utils'



import { authUser } from '../../../store/auth'
import { categoryMajors } from '../../../store/product'
import Axios from "../../../services/axios";
import { Dashboard } from "../../../components/dashboard";
import { Card } from "../../../components/common";
import { InputFieldWrapper } from "../../../components/common/input";
import useFormValidation from "../../../components/common/form/useFormValidation";
import { fetchProductCatMajors } from "../../../services/product";

const ProductCatalogue = ({ catMajors }) => {
  // useHydrateAtoms([[categoryMajors, catMajors]])
  const majorCategoryForm = React.useRef(null);
  const minorCategoryForm = React.useRef(null);
  const toast = React.useRef(null);

  const [catMajorsData, setCatMajorsData] = useAtom(categoryMajors)
  const [majorCatOptions, setMajorCatOptions] = React.useState([])
  const router = useRouter()

  React.useEffect(() => {
    if (catMajors && catMajors.length) {
      setCatMajorsData(catMajors)
      setMajorCatOptions((state) => state = catMajors.map((item) => ({ value: item.data.id, name: item.data.category })))

    }
  }, [catMajors])



  const catMajor = useFormValidation(
    {
      category: "",
    },
    {
      category: "required|string",
    },
    addMajorCategory
  );

  const catMinor = useFormValidation(
    {
      categoryMajor: "",
      category: "",
    },
    {
      categoryMajor: "required",
      category: "required|string",
    },
    addMinorCategory
  );
  async function addMajorCategory() {
    Axios
      .post(`/product/majors`, catMajor.state)
      .then(({ data }) => {
        catMajor.updateIsSubmitting(false)
        majorCategoryForm.current.hide()
        toast.current.show({ severity: 'success', summary: 'Category created successfully', life: 4000 })
        catMajor.setValues({
          categoryMajor: "",
          category: "",
        })
        router.push("/dashboard/products/catalogue")
      })
      .catch((err) => {
        catMajor.updateIsSubmitting(false);
        if (err['response']) {
          if (err.response.status === 422) {
            catMajor.setServerErrors(err.response.data)
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
  async function addMinorCategory() {
    Axios
      .post(`/product/minors`, catMinor.state)
      .then(({ data }) => {
        catMinor.updateIsSubmitting(false);
        minorCategoryForm.current.hide()
        toast.current.show({ severity: 'success', summary: 'Category created successfully', life: 4000 })
        catMinor.setValues({
          categoryMajor: "",
          category: "",
        })
        router.push("/dashboard/products/catalogue")
      })
      .catch((err) => {
        catMinor.updateIsSubmitting(false);
        if (err['response']) {
          if (err.response.status === 422) {
            catMinor.setServerErrors(err.response.data)
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

  const setMajorCat = (e, data) => {
    const ab = { ...catMinor.state, "categoryMajor": data.data.id }
    catMinor.setValues(ab)
    minorCategoryForm.current.toggle(e)
  }

  const actionTemplate = (node, column) => {
    if (node.hasOwnProperty('children')) {
      return (
        <div>
          <Button
            type='button'
            icon='pi pi-plus'
            tooltip='Add'
            tooltipOptions={{ position: "left" }}
            style={{ marginRight: ".8rem" }}
            className='p-button-info p-button-outlined p-button-sm'
            onClick={(e) => setMajorCat(e, node)}
          />
          <Button
            type='button'
            icon='pi pi-pencil'
            tooltip='Edit'
            tooltipOptions={{ position: "left" }}
            style={{ marginRight: ".8rem" }}
            className='p-button-secondary p-button-outlined p-button-sm'
          />
          <Button
            type='button'
            icon='pi pi-trash'
            tooltip='Delete'
            tooltipOptions={{ position: "left" }}
            className='p-button-danger p-button-outlined p-button-sm'></Button>
        </div>
      );
    }
    return (
      <div>
        <Button
          type='button'
          icon='pi pi-pencil'
          tooltip='Edit'
          tooltipOptions={{ position: "left" }}
          style={{ marginRight: ".8rem" }}
          className='p-button-secondary p-button-text p-button-sm'
        />
        <Button
          type='button'
          icon='pi pi-trash'
          tooltip='Delete'
          tooltipOptions={{ position: "left" }}
          className='p-button-danger p-button-text p-button-sm'></Button>
      </div>
    );
  };


  return (
    <Dashboard>
      <Toast ref={toast} position="bottom-right" />
      <OverlayPanel
        ref={majorCategoryForm}
        dismissable
        aria-haspopup
        aria-controls='overlay_panel'
        style={{ width: "300px" }}>
        <form onSubmit={catMajor.handleSubmit}>
          <InputFieldWrapper label='Category (Major)' id='major' errors={catMajor.errors.category}>
            <InputText
              id='major'
              aria-describedby='major'
              name="category"
              value={catMajor.state.category}
              onChange={catMajor.handleChange}
            />
          </InputFieldWrapper>
          <div className='submit__button'>
            <Button
              type='submit'
              label='Add'
              className='p-button-success'
              icon='pi pi-check'
              loading={catMajor.isSubmitting}
            />
          </div>
        </form>
      </OverlayPanel>
      <OverlayPanel
        ref={minorCategoryForm}
        dismissable
        aria-haspopup
        aria-controls='overlay_panel'
        style={{ width: "300px" }}>
        <form onSubmit={catMinor.handleSubmit}>
          <InputFieldWrapper label='Category (Major)' id='Major' errors={catMinor.errors.categoryMajor}>
            <Dropdown
              id='Major'
              placeholder='Select a Category'
              options={majorCatOptions}
              optionLabel='name'
              disabled
              name="categoryMajor"
              value={catMinor.state.categoryMajor}
              onChange={catMinor.handleChange}
            />

          </InputFieldWrapper>
          <InputFieldWrapper label='Category (Minor)' id='minor' errors={catMinor.errors.category}>
            <InputText
              id='minor'
              aria-describedby='major'
              placeholder='Enter name of category'
              name="category"
              value={catMinor.state.category}
              onChange={catMinor.handleChange}
            />
          </InputFieldWrapper>
          <div className='submit__button'>
            <Button
              type='submit'
              label='Add'
              className='p-button-success'
              icon='pi pi-check'
              loading={catMinor.isSubmitting}
            />
          </div>
        </form>
      </OverlayPanel>
      <Card>
        <div className='table__header'>
          <h3>Product Categories</h3>
          <Button
            type='button'
            label='Add New Category'
            onClick={(e) => majorCategoryForm.current.toggle(e)}
            className='p-button-primary'
            icon='pi pi-plus'
          />
        </div>

        <TreeTable value={catMajorsData} paginator rows={10}>
          <Column field='category' header='Name' expander></Column>
          <Column field='created_at' header='Created at' ></Column>
          <Column body={actionTemplate} style={{ textAlign: "right" }} />
        </TreeTable>
      </Card>
    </Dashboard>
  );
};

export async function getServerSideProps(ctx) {

  ctx.res.setHeader(
    'Cache-Control',
    'public, s-maxage=10, stale-while-revalidate=59'
  )
  // let AuthUser = await fetchAuthUser(Cookies, ctx)

  let catMajors = await fetchProductCatMajors()


  return {
    props: {
      catMajors
    },
  }
}

export default ProductCatalogue;
