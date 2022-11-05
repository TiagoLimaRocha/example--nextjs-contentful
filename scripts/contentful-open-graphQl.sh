yell() { echo "$0: $*" >&2; }
die() { yell "$*"; exit 111; }
try() { "$@" || die "cannot $*"; }

while getopts e: flag
do
    case "${flag}" in
        e) env=${OPTARG};;
    esac
done

# add space id and access token
access_token=
space_id= 

declare -r url="https://graphql.contentful.com/content/v1/spaces/4mu74llcmdgv/environments/$env/explore?access_token=$access_token"

echo "Checking environment..."

unameOut="$(uname -s)"
case "${unameOut}" in
    Linux*)     machine=Linux;;
    Darwin*)    machine=Mac;;
    CYGWIN*)    machine=Cygwin;;
    MINGW*)     machine=MinGw;;
    *)          machine="UNKNOWN:${unameOut}"
esac
echo "Environment: ${machine}"

if [ $machine == "Linux" ]
then
    xdg-open $url
else
    if [ $machine == "Mac" ]
    then
        open $url
    else
        echo "Cannot execute on this environment."
        echo "Contentful GraphQl URL: https://graphql.contentful.com/content/v1/spaces/$space_id/environments/<ENVIRONMENT>/explore?access_token=$access_token"
        die
    fi
fi

exit 0

