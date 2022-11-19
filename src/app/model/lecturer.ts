import { TreeNode } from './tree-node';
export class Lecturer {
  parent: TreeNode|null;
  id: string;
  name: string;
  printableName: string;
  totalPubs: number;
  pubs: Map<number, number>;
  department: string;
  faculty: string;
  university: string;
  children: TreeNode[] = [];

  constructor(id: string, name: string, year: number, pubs: number, department: string, faculty: string, university: string) {
    this.id = id;
    this.name = name;
    this.printableName = this.name;
    this.pubs = new Map<number, number>();
    this.addPublication(year, pubs);
    this.totalPubs = 0;
    this.department = department;
    this.faculty = faculty;
    this.university = university;


    this.parent = null;
    this.determinePrintableName();
  }

  addPublication(year: number, pubs: number) {
    this.pubs.set(year, pubs);
    this.totalPubs += pubs;

  }

  setParent(parent: TreeNode | null,) {
    this.parent = parent;
  }

  private determinePrintableName() {

    const length = this.printableName.length;
    var nameParts = [];
    let currentPos = 0;
    const iterator = 40;

    for (let i = iterator; i < length; i += iterator) {
      if (length < i + iterator) {
        nameParts.push(this.printableName.slice(currentPos));
      } else {
        nameParts.push(this.printableName.slice(currentPos, i));
      }
      currentPos += iterator;
    }

    this.printableName = "";
    nameParts.forEach(part => {
      this.printableName += part + "<br>";
    })

  }


}
