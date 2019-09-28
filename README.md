# gtm-composer

A mad science experiment to automate setting up Google Tag Manager containers using React Ink. Describe your GTM containers in code rather than config files!

TODO: as we traverse the tree of GTM components (accounts -> containers -> tags, etc) let's store the data we know about in a redux store. That way we can compare current state with desired state to achieve idempotency!

to test locally in development:

 - npm link
 - <cd into project dir>
 - npm link gtm-composer
 - rerun when adding a new file