import { TreeNode } from './tree-node';
export class PublicationRecord {

  parent: TreeNode|null;

  id: string;
  name: string;
  publications: number;
  year: number;
  department: string;
  faculty: string;
  university: string;
  label: string;

  constructor(id: string, name: string, publications: number, year: number, department: string, faculty: string, university: string) {
    this.parent = null;
    this.id = id;
    this.name = name;
    this.publications = publications;
    this.year = year;
    this.department = department;
    this.faculty = faculty;
    this.university = university;
    this.label = year.toString();
  }

  setParent(parent: TreeNode | null) {
    this.parent = parent;
  }



}
