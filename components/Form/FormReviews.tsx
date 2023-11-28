import styles from './FormReview.module.scss';
import * as React from 'react';
import { Formik, Field, Form, FormikHelpers } from 'formik';
import { useRef } from "react";
import { Button, Checkbox, CheckboxGroup } from "@nextui-org/react";
import PhoneInput from 'react-phone-input-2'
import { Textarea } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import Heading, { HeadingVariants } from "@/components/ui/Heading";

const Phone = ({ field, form, ...props }: any) => {
	// @ts-ignore
	return (<PhoneInput/* @ts-ignore */ as={Input}
		inputProps={{ name: props.name, id: props.id }}
		containerClass={'relative bg-white w-full inline-flex tap-highlight-transparent flex-row items-center shadow-sm px-3 gap-3 border-medium data-[hover=true]:border-default-700 group-data-[focus=true]:border-red-500 h-unit-12 min-h-unit-12 rounded-none transition-background !duration-150 transition-colors motion-reduce:transition-none'}
		inputClass={'w-full h-full font-normal  outline-none placeholder:text-foreground-500 text-medium focus:border-neutral-50'}/* autoFormat={true} */
		country={'RU'}
		placeholder={props.placeholder}
		jumpCursorToEnd={true}
		autoFormat
		specialLabel={''}
		onChange={(value) => props.setValues({ firstName: props.getFieldProps('firstName').value, phone: value })}/>);
};

interface Values {
	firstName: string;
	phone: string;
	msg: string;
	email: string;
	privacy: boolean;
	agreed: boolean;
}

const FormReviews = () => {

	const ref = useRef(null)
	// @ts-ignore
	return <div className={styles.container}>

		<Formik errors={{
			firstName: '',
			phone: '',
			msg: '',
			email: '',
			agreed: "",
			privacy: ''
		}}
			initialValues={{
				firstName: '',
				phone: '',
				msg: '',
				email: '',
				agreed: false,
				privacy: false
			}}
			// @ts-ignore
			onChange={(event: any) => this.handleChange(event)}
			onSubmit={(
				values: Values,
				{ setSubmitting }: FormikHelpers<Values>
			) => {

				setTimeout(() => {
					alert(JSON.stringify(values, null, 2));
					setSubmitting(false);
				}, 500);
			}}>
			{({ errors, touched, values, isValidating, ...props }) => (
				<><Heading className={'text-black mb-8'}
					type={HeadingVariants.h2}
					text={"Оставить отзыв"}/>
					<Form ref={ref} className={" !grid grid-cols-1 items-start gap-8 lg:grid-cols-2"}>

					<Field as={Input}
						size={"lg"}
						radius={"none"}
						variant={"bordered"}
						id="firstName"
						name="firstName"
						placeholder="Имя"
						className={" "}
						classNames={{
							base: "text-gray-500 text-base",
							input: "",
							inputWrapper: " rounded-none !h-full py-3 px-4 focus:border-primary",
							mainWrapper: " rounded-none"
						}}
						// 	classNames={{
						// 	base: "base-classes bg-white group-focus:!border-white group-focus-visible:!border-white group-focus-visible:border-white !rounded-none bg-white group-focus:border-white  data-[hover=true]:border-white group-data-[focus=true]:border-white",
						// 	label: "label-classes",
						// 	mainWrapper: ["main-wrapper-classes", "rounded-none "],
						// 	inputWrapper: "input-wrapper-classes h-8 bg-white group-focus:border-white  data-[hover=true]:border-white group-data-[focus=true]:border-white group-focus-visible:!border-white !rounded-none   group-focus:border-white    group-focus-visible:border-white   group-focus:border-white  group-focus-visible:border-white focus:border-white  group-focus-within:border-white",
						// 	innerWrapper: ["inner-wrapper-classes","group-focus:border-white","group-focus-visible:border-white", "!rounded-none"],
						// 	input: ["input-classes"],
						// 	clearButton: "clear-button-classes",
						// 	helperWrapper: "helper-wrapper-classes",
						// 	description: "description-classes",
						// 	errorMessage: "error-message-classes",
						// }}
						errorMessage={errors.firstName && touched.firstName && <div>{errors.firstName}</div>}/>

					<Field
						as={Input}
						{...props}
						className=""
						id="phone"
						name="phone"
						ke
						size={"lg"}
						placeholder={'Телефон'}
						variant={"bordered"}
						errorMessage={errors.phone && touched.phone && <div>{errors.phone}</div>}
					classNames={{
						base: "text-gray-500 text-base",
						input: "",
						inputWrapper: " rounded-none !h-full py-3 px-4 focus:border-primary",
						mainWrapper: " rounded-none"
					}}/>
	<Field
						as={Input}
						{...props}
						className=""
						id="email"
						name="email"
						ke
						size={"lg"}
						placeholder={'email'}
						variant={"bordered"}
						errorMessage={errors.phone && touched.phone && <div>{errors.phone}</div>}
		classNames={{
			base: "text-gray-500 text-base",
			input: "",
			inputWrapper: " rounded-none !h-full py-3 px-4 focus:border-primary",
			mainWrapper: " rounded-none"
		}}/>

					<Textarea key={"bordered"}
						variant={"bordered"}
						placeholder="Сообщение"
						className="!h-full lg:col-start-2 lg:row-start-1 lg:row-end-4 border-primary"
						classNames={{
							base: "text-gray-500 text-base",
							input: "",
							inputWrapper: " rounded-none !h-full py-3 px-4 focus:border-primary",
							mainWrapper: " rounded-none"
						}}/>
					<CheckboxGroup

						orientation="horizontal"
						color="primary"
						size={"lg"}
						radius={"sm"}
						className={"flex lg:col-span-2 "}
						classNames={{
							wrapper: "gap-12 my-4"
						}}

					>
						<Field as={Checkbox} key={"privacy"} type={"checkbox"}  name={"privacy"}  classNames={{
							icon: "w-6 h-5",
							wrapper: "h-8 w-8 mr-3 mb-0.5 ",
							label: "font-[600] text-gray-500 text-sm"
						}}   size={"lg"} value="privacy">Я согласен на обработку персональных данных</Field>
						<Field as={Checkbox}  key={"agreed"} type={"checkbox"} name={"agreed"}  classNames={{
							icon: "w-6 h-5",
							wrapper: "h-8 w-8 mr-3 mb-0.5",
							label: "font-[600] text-gray-500 text-sm"
						}}   size={"lg"}  value="public">Разрешить публиковать ваш отзыв</Field>

					</CheckboxGroup>
					<Button radius={"none"}
						size={"lg"}
						className={"p-4  bg-transparent self-center  stg-button border-primary h-[48px] font-semibold border-2 data-[hover=true]:bg-primary data-[hover=true]:text-white data-[hover=true]:border-primary  max-w-fit"}
						color="default"
						variant="bordered"
						type={"submit"}>Оставить отзыв</Button>
				</Form></>
			)}
		</Formik>
	</div>;
};

export default FormReviews;
