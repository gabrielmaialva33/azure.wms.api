module.exports = {
  apps: [
    {
      name: 'azure.wms.api',
      script: 'yarn',
      args: 'start',
      interpreter: '/bin/bash',
      instances: 'max',
      exec_mode: 'cluster',
      autorestart: true,
    },
  ],
};
