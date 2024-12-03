import * as fs from "fs/promises";
let arrResults = [];
let countSecure = 0;
async function readFile() {
  try {
    let data = await fs.readFile("listas.txt", "utf-8");
    data = data.split("\r\n");
    let dataRemoveSpace = [];
    for (const x of data) {
      dataRemoveSpace.push(x.replace(/\s+/g, ",").split(","));
    }

    return dataRemoveSpace;
  } catch (err) {
    console.error("Erro ao ler o arquivo:", err);
  }
}

function isValidArray(arr) {
  let retry = 0;
  let numbers = arr.map(Number);

  while (retry <= 1) {
    const isCrescent = numbers.every((val, i, a) => i === 0 || val > a[i - 1]);
    const isDecrescent = numbers.every(
      (val, i, a) => i === 0 || val < a[i - 1]
    );

    if (!isCrescent && !isDecrescent) return false;

    let valid = true;
    for (let i = 1; i < numbers.length; i++) {
      const diff = Math.abs(numbers[i] - numbers[i - 1]);
      if (diff > 3) {
        if (retry < 1) {
          retry++;
          numbers.splice(i, 1);
          valid = false;
          break;
        } else {
          return false;
        }
      }
    }

    if (valid) {
      countSecure++;
      return true;
    }
  }
  return false;
}

async function main() {
  const file = await readFile();
  file.forEach((array, index) => {
    isValidArray(array);
  });
  console.log(countSecure);
}
main();
