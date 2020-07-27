# Gets the latest version of node by default. Change to get a specific version.
FROM node

# Updates and installs all required libraries in the image for Chrome and Puppeteer to work.
RUN apt-get update && \
  apt-get install -yq gconf-service libasound2 libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 \
  libexpat1 libfontconfig1 libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 \
  libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 \
  libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 \
  fonts-ipafont-gothic fonts-wqy-zenhei fonts-thai-tlwg fonts-kacst ttf-freefont \
  ca-certificates fonts-liberation libappindicator1 libnss3 lsb-release xdg-utils wget && \
  wget https://github.com/Yelp/dumb-init/releases/download/v1.2.1/dumb-init_1.2.1_amd64.deb && \
  dpkg -i dumb-init_*.deb && rm -f dumb-init_*.deb && \
  apt-get clean && apt-get autoremove -y && rm -rf /var/lib/apt/lists/*

# Creates a new directory and navigates into it.
WORKDIR /app/

# Copies all content (other than those defined in .dockerignore) into the 'app' folder defined above.
COPY . .

# RUNs `npm ci` instead of `npm install`. 
# This command uses the `package-lock.json` file to determine the exact dependencies needed.
# This will not work if `package-lock.json` is not available in the project.
RUN npm ci

# Runs the `jest` command with the `--runInBand` flag set, which helps in environments with limited resources.
RUN npm run test-ci
