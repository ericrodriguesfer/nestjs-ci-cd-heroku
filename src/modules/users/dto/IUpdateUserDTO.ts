interface IUpdateUserDTO {
  id: string;
  data: {
    name?: string;
    email?: string;
    age?: number;
  };
}

export default IUpdateUserDTO;
