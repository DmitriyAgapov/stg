import styles from './TableUI.module.scss';
import React, { JSX, useEffect, useMemo } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, TableCellProps } from "@nextui-org/react";
import { translateText } from "@/utils/translate";

interface VariantProps  {
	id: string
	size: string
	thickness: number
	quanity_in_box: number
	sqrt: number
	weight: number
	specific_weight: number
	kmp: number
	adhesion: number
	temp: string
}
const TableUI = ({items}: {items: VariantProps[]}):any => {

	const tableData = useMemo(() => {
		const columns = new Set();
		const keys = new Set();

		items.map((item) => Object.keys(item)).forEach((el) => {
			 el.forEach(e =>  (e !== "id") && keys.add(e))
		})
		const rowsTable:any = [];
		function CellsTable ({ key, value } : { key: string, value: any }) {
			const cells: JSX.Element[] = []
			cells.push(<TableCell className={"bg-gray-300 py-4 px-3  font-bold capitalize"} key={key}>{translateText(key)}</TableCell>)
			// @ts-ignore
			items.forEach((i) =>  cells.push(<TableCell className={"bg-white py-4 px-3"} key={i.thickness}>{i[key] ? i[key] : "-"}</TableCell>))
			return <TableRow key={key} >{cells}</TableRow>
		}

		items.forEach((item) => columns.add(item.thickness))

		keys.forEach((key) => {
			if(key !== "id" && key !== "thickness") {
				// @ts-ignore
				rowsTable.push(CellsTable({ key: key}))
			}
		})

		return {
			rows: rowsTable,
			columns: [<TableColumn className={"bg-gray-300 py-4 px-3  font-bold capitalize"} key={'thickness'}>{translateText('thickness')}</TableColumn>, ...Array.from(columns).map(
				// @ts-ignore
				(col:VariantProps) => <TableColumn className={"bg-gray-300 py-4 px-3 font-bold capitalize"} key={col}>{translateText(col)}</TableColumn>)],
		}
	}, [items]);

	useEffect(() => {
		console.log(tableData)
	}, [tableData]);


	// @ts-ignore
	return <div className={styles.TableUI}>
		<Table removeWrapper  aria-label="Example static collection table" radius={"none"} shadow={"none"} classNames={{
			thead: "rounded-none",
			tr: "!rounded-none",
			table: "border-gray-400 border-2 border-collapse border-solid",
			th: "!rounded-none border-gray-400 border-2 border-collapse border-solid",
			base: "!py-0",
			td: "border-gray-400 border-2 border-collapse border-solid"
		}}>
			<TableHeader>
				{...tableData.columns}

			</TableHeader>
			<TableBody>
				{...tableData.rows}
			</TableBody>
		</Table>
	</div>;
};

export default TableUI;
