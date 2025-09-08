import User from '../app/modules/User/user.model';
import config from '../config';

const superAdmin = {
  name: 'Mr. Admin',
  email: config.admin_credential.admin_email,
  password: config.admin_credential.admin_password,
  role: 'admin',
};

export const seedAdmin = async () => {
  const isSuperAdminExits = await User.findOne({
    email: config.admin_credential.admin_email,
    role: 'admin',
  });

  if (!isSuperAdminExits) {
    await User.create(superAdmin);
  }
};
