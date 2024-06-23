export interface ProfileData {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
    birthdate: string;
    city: string;
    state: string;
    skillsOffered: Skills;
    skillsWanted: Skills;
    profileImage: string;
    profilePictureFile: File | null;
    uid: string;
}
  
export interface Skills {
    [category: string]: {
      [subcategory: string]: string[];
    };
}
  