import { parse } from 'csv-parse';
import fs from 'node:fs';

const csvPath = new URL('./tasks-sample.csv', import.meta.url)

const csvStream = fs.createReadStream(csvPath)

const csvParseOptions = {
  from_line: 2,
  skip_empty_lines: true
}

const csvParser = parse(csvParseOptions)

async function importCSVToDatabase() {
  const rows = csvStream.pipe(csvParser)

  for await (const row of rows) {
    const [title, description] = row

    try {
      fetch('http://localhost:3333/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title,
          description
        })
      })
    } catch (error) {
      console.error(error)
    }
    
  }
}

importCSVToDatabase()