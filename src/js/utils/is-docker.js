import fs from 'node:fs'

let isDockerCached

const hasDockerEnv = () => {
  try {
    fs.statSync('/.dockerenv')
    return true
  } catch {
    return false
  }
}

const hasDockerCGroup = () => {
  try {
    return fs.readFileSync('/proc/self/cgroup', 'utf8').includes('docker')
  } catch {
    return false
  }
}

const hasDockerMountInfo = () => {
  try {
    return fs.readFileSync('/proc/self/mountinfo', 'utf8').includes('/docker/containers/')
  } catch {
    return false
  }
}

const isDocker = () => {
  isDockerCached ??= hasDockerEnv() || hasDockerCGroup() || hasDockerMountInfo()
  return isDockerCached
}

export default isDocker
