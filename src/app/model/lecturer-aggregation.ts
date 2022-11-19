import { TreeNode } from './tree-node';
export class LecturerAggregation {
  id: string;
  name: string;
  totalPubs: number;
  pubs: Map<number, number>;
  department: string;
  faculty: string;
  university: string;
  publications2019: number = 0;
  publications2020: number = 0;

  constructor(id: string, name: string, year: number, pubs: number, department: string, faculty: string, university: string) {
    this.id = id;
    this.name = name;
    this.pubs = new Map<number, number>();
    this.addPublication(year, pubs);
    this.totalPubs = pubs;
    this.department = department;
    this.faculty = faculty;
    this.university = university;

    this.setPublicationValue(year, pubs);
  }

  addPublication(year: number, pubs: number) {
    this.pubs.set(year, pubs);
    this.totalPubs += pubs;
    this.setPublicationValue(year, pubs);
  }

  private setPublicationValue(year: number, pubs: number) {
    if (year == 2019) {
      this.publications2019 = pubs;
    } else {
      this.publications2020 = pubs;
    }
  }

}
