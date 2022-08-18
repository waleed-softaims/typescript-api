import getAirtableDatas from './airtableApi'
import urlencode from 'urlencode'
import { BASE_URL } from './airtableEndPiont'
import { STUDENTS_FIELD_ID } from './airtableEndPiont'
import { CLASS_FIELD_ID } from './airtableEndPiont'

type classDetailsProps = {
	fields: {
		Classes: []
	}
}

type recordType = {
	records: []
}

type studentProp = {
	records: {
		id: string
		fields: {
			Name: string[]
		}
		}[]
}

const getStudentDetails = async (name: string) => {
	const formular = urlencode(`({Name} = '${name}')`)
	const result = await getAirtableDatas(
		`${BASE_URL}/${STUDENTS_FIELD_ID}/?filterByFormula=${formular}`,
	)
	localStorage.setItem("name", result.records)
	return result.records
}

const getClassDetails = async (name: string) => {
	const classDetails = await getStudentDetails(name)
	let classIds = classDetails.map((classDetail: classDetailsProps) => classDetail.fields.Classes)
	let arr: string[] = []
	let result: recordType

	classIds.forEach((classId: []) => {
		arr = arr.concat(classId)
	})

	result = await getAirtableDatas(
		`${BASE_URL}/${CLASS_FIELD_ID}/?filterByFormula=${filterByFormula(arr)}`,
	)
	return result.records.map((record: { fields: { Name: string; Students: string[] } }) => ({
		name: record.fields.Name,
		students: record.fields.Students,
	}))
}

const getStudentsFromClass = async (name: string) => {
	const results = await getClassDetails(name)
	let studentList: string[] = []
	results.forEach(result => (studentList = [...studentList, ...result.students]))
	studentList = [...Array.from(new Set(studentList))]
	const studentNames: studentProp = await getAirtableDatas(
		`${BASE_URL}/${STUDENTS_FIELD_ID}/?filterByFormula=${filterByFormula(studentList)}`,
	)

	const studentMap = new Map()
	studentNames.records.forEach(student=> {
		studentMap.set(student.id, student.fields.Name)
	})

	results.forEach(result => {
		result.students = result.students.map(id => studentMap.get(id))
	})

	return results
}

const filterByFormula = (arr: string[]) => {
	let formularStr = 'OR('
	arr.forEach((id, index) => {
		formularStr += `RECORD_ID() = '${id}'`
		formularStr += index < arr.length - 1 ? ', ' : ')'
	})
	const formular = urlencode(formularStr)
	return formular
}

export default getStudentsFromClass
