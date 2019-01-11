import React from 'react';
import { Formik, Field, Form } from 'formik';
import {string, object, boolean} from 'yup';
import "./OrderForm.css"; 

const OrderForm = ({ initialData, onSubmit, onClose }) => {
  const validation = object().shape({
    email: string().email('Neispravna e-mail adresa').required('Morate unesti email!'),
    consent: boolean().required('Morate pristati na naše uvjete!'),
    mobile: string().required('Morate unesti broj mobitela!'),
    name: string().required('Morate unesti vaše ime i prezime!'),
    address: string().required('Morate unesti vašu adresu!'),
    city: string().required('Morate unesti vaše mjesto!'),
  });

  return (
    <React.Fragment>
      <h3>Narudžba udžbenika</h3>
      <h6>
        <small>Prije uplate narudžbe obavezno prekontrolirajte odabir udžbenika. Ukoliko neki udžbenici nedostaju, možete ih navesti u polju <strong>Napomena</strong>.<br/>
        <em>Očekivani termin dostave je <strong>20.9.{(new Date().getFullYear())}.</strong>, no rok isporuke ovisi o vrsti robe i lokaciji dostave.</em></small>
      </h6>
      <Formik
        initialValues={initialData}
        onSubmit={onSubmit}
        validationSchema={validation}
        render={({ errors, touched, isSubmitting }) => (
          <Form className="order-form">
            <label htmlFor="name">Ime i prezime</label>
            <Field type="text" name="name" className={"u-full-width" + (errors.name ? ' input-error' : '')}  autoComplete="name" />
            {errors.name && <div className="field-error">{errors.name}</div>}
      
            <label htmlFor="address">Adresa (ulica i kućni broj)</label>
            <Field type="text" name="address" autoComplete='address-line1' className={"u-full-width" + (errors.address ? ' input-error' : '')} />
            {errors.address && <div className="field-error">{errors.address}</div>}

            <label htmlFor="address">Mjesto</label>
            <Field type="text" name="city" autoComplete='address-level2' className={"u-full-width" + (errors.city ? ' input-error' : '')} />
            {errors.city && <div className="field-error">{errors.city}</div>}

            <label htmlFor="email">E-mail</label>
            <Field type="email" name="email" autoComplete='email' className={"u-full-width" + (errors.email ? ' input-error' : '')} />
            {errors.email && <div className="field-error">{errors.email}</div>}

            <label htmlFor="mobile">Broj mobitela</label>
            <Field type="text" name="mobile" autoComplete='tel' className={"u-full-width" + (errors.mobile ? ' input-error' : '')} />
            {errors.mobile && <div className="field-error">{errors.mobile}</div>}

            <label htmlFor="phone">Broj telefona</label>
            <Field type="text" name="phone" autoComplete='tel' className={"u-full-width" + (errors.phone ? ' input-error' : '')} />
            {errors.phone && <div className="field-error">{errors.phone}</div>}

            <label htmlFor="userComment">Napomena (ovdje možete napisati udžbenike koji eventualno nedostaju i sl.)</label>
            <Field component="textarea" name="userComment" className={"u-full-width" + (errors.userComment ? ' input-error' : '')} />
            {errors.phone && <div className="field-error">{errors.userComment}</div>}

            <div class="row">
              <div class="six columns">
                <label htmlFor="paymentType">Način plaćanja</label>
                <Field component="select" name="paymentType" className={"paymentType" + (errors.delivery ? ' input-error' : '')}>
                  <option value="1">Virman / Internet bankarstvo</option>
                  <option value="2">Plaćanje gotovinom pri preuzimanju / plaćanje pouzećem</option>
                </Field>
                {errors.paymentType && <div className="field-error">{errors.paymentType}</div>}
              </div>
              <div class="six columns">       
                <label htmlFor="delivery">Dostava</label>
                <Field component="select" name="delivery" className={"delivery" + (errors.delivery ? ' input-error' : '')}>
                  <option value="0">Osobno preuzimanje (+0,00 kn)</option>
                  <option value="35">Dostava na kućnu adresu (+35,00 kn)</option>
                </Field>
                {errors.delivery && <div className="field-error">{errors.delivery}</div>}
              </div>  
            </div>
            <label htmlFor="consent">
              <Field type="checkbox" name="consent" />
              <span className={"label-body" + (errors.consent ? ' field-error' : '')}><small>Pristajem da moje osobne podatke koristite kako biste me kontaktirali i ostvarili narudžbu udžbenika.</small></span>
            </label>
            {errors.consent && <div className="field-error">{errors.consent}</div>}
        
            <button type="submit" className="button-primary" disabled={isSubmitting}>
              Dovrši narudžbu
            </button>
          </Form>
        )}
      />
    </React.Fragment>
  );
};

export default OrderForm;